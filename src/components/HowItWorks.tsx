/**
 * HowItWorks — Visual explainer for the Arcium MPC data exchange flow.
 *
 * This section is critical for hackathon judges: it demonstrates that we
 * understand how MPC works and why it matters for data privacy.
 *
 * The four steps map directly to the Arcium protocol flow:
 *   1. Data encryption via Arcium's secret-sharing scheme
 *   2. Access request (no raw data is ever transmitted)
 *   3. MPC computation across distributed nodes
 *   4. Result delivery + atomic payment settlement on Solana
 *
 * The connector lines between cards (visible on lg+ screens) represent
 * the sequential flow of the protocol — each step must complete before
 * the next can begin, which is enforced on-chain.
 */

import { motion } from "framer-motion";
import { Upload, Shield, Cpu, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "List Encrypted Data",
    description: "Upload your dataset. It's automatically encrypted using Arcium's MPC protocol before storage.",
    step: "01",
  },
  {
    icon: Shield,
    title: "Buyer Requests Access",
    description: "Buyers browse metadata and request access. Your raw data is never exposed to anyone.",
    step: "02",
  },
  {
    icon: Cpu,
    title: "MPC Computation",
    description: "Arcium's multi-party computation nodes process the data while it remains fully encrypted.",
    step: "03",
  },
  {
    icon: Download,
    title: "Receive Results",
    description: "Buyer gets computed results, seller gets paid. Zero data exposure throughout the process.",
    step: "04",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Four steps to privacy-preserving data exchange on Solana.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              {/* Connector line between steps — only on desktop */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/40 to-transparent" />
              )}

              <div className="glass rounded-xl p-6 gradient-border glass-hover h-full">
                <div className="text-5xl font-bold font-mono text-primary/10 mb-3">
                  {step.step}
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
