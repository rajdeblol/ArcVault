/**
 * DataListings — Browsable grid of encrypted datasets available on the marketplace.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, Database, TrendingUp, Users, Lock, FileText, X, Star, ShieldCheck } from "lucide-react";

const categoryLabels = ["All", "DeFi", "Healthcare", "Identity", "Analytics"];

const listings = [
  {
    title: "DEX Trading Signals",
    description: "Real-time encrypted trading patterns from top 50 Solana DEXs with MPC-verified analytics",
    category: "DeFi",
    price: "2.5 SOL",
    encryption: "AES-256 + MPC",
    buyers: 342,
    rating: 4.9,
    icon: TrendingUp,
    hot: true,
  },
  {
    title: "Anonymous Health Records",
    description: "De-identified patient datasets for ML training, fully HIPAA compliant via Arcium encryption",
    category: "Healthcare",
    price: "8.0 SOL",
    encryption: "MPC + ZK-Proof",
    buyers: 128,
    rating: 4.7,
    icon: FileText,
    hot: false,
  },
  {
    title: "On-Chain Identity Scores",
    description: "Privacy-preserving credit scoring using encrypted wallet history and DeFi participation",
    category: "Identity",
    price: "1.2 SOL",
    encryption: "Homomorphic",
    buyers: 567,
    rating: 4.8,
    icon: Users,
    hot: true,
  },
  {
    title: "Whale Wallet Analytics",
    description: "Encrypted analysis of top 1000 wallets movement patterns without revealing addresses",
    category: "Analytics",
    price: "4.0 SOL",
    encryption: "MPC + TEE",
    buyers: 234,
    rating: 4.6,
    icon: Database,
    hot: false,
  },
  {
    title: "NFT Market Intelligence",
    description: "Encrypted wash-trade detection and real volume analytics across Solana NFT marketplaces",
    category: "Analytics",
    price: "3.2 SOL",
    encryption: "AES-256 + MPC",
    buyers: 189,
    rating: 4.5,
    icon: Eye,
    hot: false,
  },
  {
    title: "DeFi Yield Optimizer Data",
    description: "Private yield farming strategies computed via MPC without exposing alpha signals",
    category: "DeFi",
    price: "6.5 SOL",
    encryption: "Full MPC",
    buyers: 412,
    rating: 4.9,
    icon: Shield,
    hot: true,
  },
];

type Listing = typeof listings[number];

const DataListings = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const filtered = activeCategory === "All"
    ? listings
    : listings.filter((l) => l.category === activeCategory);

  return (
    <section id="marketplace" className="py-24 relative">
      <div className="absolute inset-0 dot-pattern opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Featured Datasets
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Browse privacy-preserving datasets. All computations happen on encrypted data.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categoryLabels.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground glow-box"
                  : "glass glass-hover text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((listing, i) => (
            <motion.div
              key={listing.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass glass-hover rounded-xl p-6 gradient-border cursor-pointer"
              onClick={() => setSelectedListing(listing)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <listing.icon className="w-5 h-5 text-primary" />
                </div>
                {listing.hot && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                    Hot
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {listing.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                {listing.description}
              </p>

              <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-primary" />
                  {listing.encryption}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {listing.buyers}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-lg font-bold font-mono text-gradient-purple">
                  {listing.price}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedListing(listing); }}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedListing(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-2xl p-8 max-w-lg w-full gradient-border relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedListing(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <selectedListing.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedListing.title}</h3>
                  <span className="text-xs text-muted-foreground">{selectedListing.category}</span>
                </div>
                {selectedListing.hot && (
                  <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                    Hot
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {selectedListing.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Lock className="w-3 h-3 text-primary" />
                    Encryption
                  </div>
                  <div className="text-sm font-medium text-foreground">{selectedListing.encryption}</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Users className="w-3 h-3" />
                    Buyers
                  </div>
                  <div className="text-sm font-medium text-foreground">{selectedListing.buyers}</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    Rating
                  </div>
                  <div className="text-sm font-medium text-foreground">{selectedListing.rating}/5.0</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <ShieldCheck className="w-3 h-3 text-cyber-green" />
                    Privacy
                  </div>
                  <div className="text-sm font-medium text-foreground">Verified</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-2xl font-bold font-mono text-gradient-purple">
                  {selectedListing.price}
                </span>
                <button className="px-6 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-box">
                  Purchase Dataset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DataListings;
