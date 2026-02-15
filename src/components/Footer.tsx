/**
 * Footer — Minimal footer with brand mark and external links.
 * Links to Arcium developer docs and main site for judges/reviewers.
 */

import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <Shield className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-bold text-foreground">
              Arc<span className="text-primary">Vault</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="https://docs.arcium.com/developers" className="hover:text-foreground transition-colors">
              Docs
            </a>
            <a href="https://arcium.com" className="hover:text-foreground transition-colors">
              Arcium
            </a>
            <span>Built on Solana × Arcium MPC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
