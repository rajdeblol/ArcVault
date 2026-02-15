# ArcVault — System Architecture

## High-Level Overview

ArcVault is a three-layer system: a **Solana program** handles payments and access control, the **Arcium MPC network** handles encrypted data storage and computation, and a **React frontend** provides the marketplace interface.

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                       │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  Wallet  │  │  Marketplace │  │  Dataset Viewer   │  │
│  │  Adapter │  │  Browser     │  │  (encrypted view) │  │
│  └────┬─────┘  └──────┬───────┘  └────────┬──────────┘  │
│       │               │                    │             │
└───────┼───────────────┼────────────────────┼─────────────┘
        │               │                    │
        ▼               ▼                    ▼
┌─────────────────────────────────────────────────────────┐
│                  Solana Blockchain                        │
│  ┌──────────────┐  ┌─────────────┐  ┌────────────────┐  │
│  │   Listing    │  │   Escrow    │  │   Access       │  │
│  │   Program    │  │   Program   │  │   Control      │  │
│  │   (PDA)      │  │   (SPL)     │  │   (PDA)        │  │
│  └──────┬───────┘  └──────┬──────┘  └───────┬────────┘  │
│         │                 │                  │           │
└─────────┼─────────────────┼──────────────────┼───────────┘
          │                 │                  │
          ▼                 ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│               Arcium MPC Network                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │  Node 1 │  │  Node 2 │  │  Node 3 │  │  Node N │   │
│  │ (share) │  │ (share) │  │ (share) │  │ (share) │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
│         Encrypted shares — no single node has full data  │
└─────────────────────────────────────────────────────────┘
```

## Data Flow: Seller Lists a Dataset

```
1. Seller connects wallet (Phantom/Solflare)
2. Seller selects dataset and encryption parameters
3. Frontend encrypts data client-side (AES-256 initial layer)
4. Arcium SDK splits encrypted data into MPC shares
5. Shares are distributed to Arcium MPC nodes
6. Frontend calls Solana program to create listing PDA:
   - Stores: data_hash, price, seller_pubkey, encryption_type, metadata_uri
   - Listing PDA = seeds["listing", seller_pubkey, listing_id]
7. Listing appears in marketplace with encrypted metadata
```

## Data Flow: Buyer Purchases Access

```
1. Buyer browses marketplace listings (metadata only — no raw data exposed)
2. Buyer verifies dataset properties via zero-knowledge proof
3. Buyer initiates purchase:
   a. Frontend builds Solana transaction:
      - Transfer SOL/SPL to escrow PDA
      - Update access_control PDA with buyer_pubkey
   b. Transaction is signed and submitted
4. On-chain program validates payment and grants access token
5. Access token is sent to Arcium MPC network
6. MPC nodes collaboratively compute buyer's requested operation
7. Only computed results (not raw data) are returned to buyer
8. Escrow releases payment to seller
```

## Arcium MPC Integration Points

### Where MPC is Used

| Component | MPC Role |
|---|---|
| Data Storage | Split into shares across nodes (secret sharing) |
| Data Verification | ZK proofs for schema/quality without decryption |
| Computation | Garbled circuits for analytics on encrypted data |
| Access Control | Threshold signatures for multi-party authorization |

### Arcis Circuit Design

Arcis is Arcium's circuit language for defining MPC computations. Our marketplace uses it for:

```
// Simplified Arcis circuit for data quality verification
circuit verify_dataset_quality {
    input seller_data: encrypted<Dataset>;
    input buyer_criteria: public<QualityCriteria>;
    
    // Compute statistics on encrypted data
    let row_count = count(seller_data.rows);
    let completeness = non_null_ratio(seller_data);
    
    // Return only the quality score, not the data
    output quality_score: public<f64> = compute_score(row_count, completeness);
    output meets_criteria: public<bool> = quality_score >= buyer_criteria.min_score;
}
```

## Solana Program Design

### Program Derived Addresses (PDAs)

```
Listing PDA:     seeds = ["listing", seller_pubkey, listing_id]
Escrow PDA:      seeds = ["escrow", listing_id, buyer_pubkey]
Access PDA:      seeds = ["access", listing_id, buyer_pubkey]
Reputation PDA:  seeds = ["reputation", user_pubkey]
```

### Instruction Set

```rust
pub enum MarketplaceInstruction {
    /// Create a new data listing with encrypted metadata
    CreateListing { price: u64, data_hash: [u8; 32], metadata_uri: String },
    
    /// Buyer purchases access — funds go to escrow
    PurchaseAccess { listing_id: Pubkey },
    
    /// Release escrow after MPC confirms delivery
    ConfirmDelivery { listing_id: Pubkey, buyer: Pubkey },
    
    /// Dispute resolution (timeout-based)
    DisputeTransaction { listing_id: Pubkey, reason: String },
}
```

## Security Model

### Threat Mitigation

| Threat | Mitigation |
|---|---|
| Data exposure during transaction | MPC ensures data stays encrypted throughout |
| Malicious MPC node | Threshold scheme — requires majority collusion to compromise |
| Front-running | Solana transaction ordering + commit-reveal for bids |
| Escrow manipulation | Time-locked escrow with on-chain dispute resolution |
| Fake listings | Reputation system + stake requirement for sellers |

### Trust Assumptions

1. **Honest majority** among MPC nodes (standard MPC assumption)
2. **Solana validator set** is decentralized enough for censorship resistance
3. **Client-side encryption** is performed correctly (open-source, auditable)
4. **No trusted third party** — ArcVault operators cannot access user data

## Frontend Architecture

The frontend is a single-page React application with route-based code splitting:

```
App.tsx
├── QueryClientProvider (TanStack Query for async state)
├── TooltipProvider (accessible UI primitives)
├── BrowserRouter
│   ├── / → Index.tsx
│   │   ├── Navbar (wallet connection, navigation)
│   │   ├── HeroSection (marketplace stats, CTAs)
│   │   ├── DataListings (filterable dataset cards)
│   │   ├── HowItWorks (MPC flow visualization)
│   │   └── Footer
│   └── * → NotFound.tsx
```

### State Management Strategy

- **Server state**: TanStack Query for on-chain data, listing metadata
- **Wallet state**: Solana wallet-adapter context
- **UI state**: Local component state (filters, modals, forms)
- **No global state store** — complexity is managed through composition

## Deployment

```
Frontend:  Vercel / Lovable (static SPA)
Solana:    Devnet → Mainnet-beta
Arcium:    Arcium testnet → mainnet
Storage:   Metadata on Arweave, encrypted data on Arcium MPC nodes
```
