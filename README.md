# ArcVault — Encrypted Data Marketplace

> Privacy-first data exchange built on **Solana**, powered by **Arcium MPC**.

## Overview

ArcVault is a decentralized marketplace where data sellers and buyers transact without ever exposing raw data. We leverage Arcium's Multi-Party Computation (MPC) protocol to guarantee that sensitive information stays encrypted end-to-end — even during computation and verification.

## The Problem

Traditional data marketplaces have a fundamental flaw: buyers need to see data before they buy, and sellers lose control once data is shared. Encryption alone doesn't solve this — at some point, someone has to decrypt. This creates a trust bottleneck that limits what kinds of data can be monetized.

## Our Solution

ArcVault removes the trust bottleneck entirely. With Arcium MPC:

- **Data never leaves encryption** — not during listing, not during purchase, not during computation
- **Buyers verify quality** through zero-knowledge proofs without accessing raw datasets
- **Sellers retain sovereignty** — revocation and access control are enforced on-chain
- **No single party** (including ArcVault) can decrypt user data

## How Arcium MPC Works in ArcVault

```
Seller                    Arcium MPC Network                 Buyer
  │                              │                              │
  ├── Encrypt & Upload ────────► │                              │
  │                              ├── Store encrypted shares     │
  │                              │   across MPC nodes           │
  │                              │                              │
  │   On-chain hash ◄──────────── │                              │
  │   (Solana program)           │                              │
  │                              │                 Purchase ────┤
  │                              │ ◄── Verify payment (SPL) ───┤
  │                              │                              │
  │                              ├── MPC computation ──────────► │
  │                              │   (encrypted results only)   │
  │                              │                              │
  │   Payment received ◄──────── │                              │
```

1. **Listing** — Seller uploads data. Arcium splits it into encrypted shares distributed across MPC nodes (no single node holds the full dataset).
2. **On-Chain Anchoring** — A hash of the encrypted data is stored on Solana as a Program Derived Address (PDA), linking the listing to immutable blockchain state.
3. **Purchase** — Buyer sends SOL/SPL tokens to the escrow program. The smart contract validates the transaction and signals the MPC network.
4. **Secure Computation** — Arcium's MPC nodes collaboratively compute the buyer's requested analytics on encrypted data. Raw data is never reconstructed.
5. **Delivery** — Computed results are delivered to the buyer. The seller receives payment atomically via Solana's transaction model.

## Privacy Guarantees

| Feature | How It Works |
|---|---|
| **Zero-Knowledge Transactions** | Buyers verify dataset properties (size, schema, freshness) without seeing contents |
| **Distributed Trust** | Data is split across independent MPC nodes — collusion-resistant by design |
| **On-Chain Privacy** | Solana provides transparency for payments and access control, not for data |
| **Secure Computation** | Arcium's garbled circuits enable computation on ciphertext directly |

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Blockchain | Solana | Sub-second finality, ~$0.00025/tx, native SPL token support |
| Privacy | Arcium MPC SDK | Production-grade multi-party computation with Solana integration |
| Frontend | React 18 + TypeScript | Type-safe UI with component isolation |
| Build | Vite | Fast HMR, optimized production builds |
| Styling | Tailwind CSS + custom design system | Utility-first with semantic tokens for dark-mode-first UI |
| Animation | Framer Motion | Physics-based animations for marketplace interactions |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/arcvault.git
cd arcvault

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

```env
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_ARCIUM_API_KEY=your_arcium_key
VITE_PROGRAM_ID=your_deployed_program_id
```

## Project Structure

```
src/
├── assets/            # Static assets (hero images, icons)
├── components/
│   ├── ui/            # Base UI primitives (shadcn)
│   ├── Navbar.tsx     # Navigation with wallet connect
│   ├── HeroSection.tsx    # Landing hero with marketplace stats
│   ├── DataListings.tsx   # Encrypted dataset cards with filtering
│   ├── HowItWorks.tsx     # MPC flow visualization
│   └── Footer.tsx         # Site footer with Arcium/Solana links
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/
│   ├── Index.tsx      # Main marketplace page
│   └── NotFound.tsx   # 404 handler
├── index.css          # Design system tokens & custom utilities
└── main.tsx           # Application entry point
```

## Roadmap

- [ ] Wallet adapter integration (Phantom, Solflare, Backpack)
- [ ] Solana program deployment (Anchor framework)
- [ ] Arcium MPC SDK integration for real encrypted data flows
- [ ] Dataset upload with client-side encryption
- [ ] On-chain reputation & review system
- [ ] Multi-chain bridge support (Ethereum, Polygon)
- [ ] Decentralized storage backend (Arweave/IPFS)

## Team

Built by developers who believe data privacy isn't optional — it's infrastructure.

## License

MIT — see [LICENSE](./LICENSE) for details.
