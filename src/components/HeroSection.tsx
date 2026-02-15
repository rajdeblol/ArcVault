/**
 * HeroSection — Primary landing section for the ArcVault marketplace.
 *
 * Communicates the core value prop: encrypted data trading on Solana
 * via Arcium MPC. The stats bar at the bottom pulls from on-chain data
 * in production (currently hardcoded for the prototype).
 *
 * The two CTAs map to the main user flows:
 *   - "Explore Marketplace" → scrolls to #marketplace (buyer flow)
 *   - "List Your Data" → will open the seller upload modal (seller flow)
 *
 * Privacy context: The "Powered by Arcium MPC" badge is intentional —
 * we want users to understand that MPC is the privacy mechanism, not
 * just standard encryption. MPC means data stays encrypted even during
 * computation, which is the key differentiator.
 */

import { motion } from "framer-motion";
import { ArrowRight, Lock, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Layered background: image → gradient overlay → dot pattern */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Protocol badge — pulsing dot indicates live network status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass gradient-border mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground tracking-wide uppercase">
              Powered by Arcium MPC
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            <span className="text-gradient">Encrypted</span>
            <br />
            <span className="text-gradient-purple">Data Marketplace</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Buy and sell data with complete privacy. Multi-Party Computation ensures
            your data stays encrypted — even during transactions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-box hover:bg-primary/90 transition-all"
            >
              <Zap className="w-4 h-4" />
              Explore Marketplace
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-lg glass glass-hover font-medium text-sm text-foreground gradient-border"
            >
              <Lock className="w-4 h-4 text-primary" />
              List Your Data
            </motion.button>
          </div>
        </motion.div>

        {/*
         * Marketplace stats — these will be fetched from on-chain PDAs in production.
         * For now they're hardcoded to demonstrate the UI. The "Privacy Rate" metric
         * refers to the percentage of transactions using MPC (should always be 100%).
         */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: "$12.4M", label: "Total Volume" },
            { value: "2,847", label: "Datasets Listed" },
            { value: "1,203", label: "Active Buyers" },
            { value: "100%", label: "Privacy Rate" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-lg glass gradient-border"
            >
              <div className="text-2xl md:text-3xl font-bold text-gradient-purple font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
