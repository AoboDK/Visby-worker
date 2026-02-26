import { Link } from "wouter";
import { TerminalSquare, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 inline-flex">
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white">
                <TerminalSquare className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Visby<span className="text-accent"> IT.</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Leverer problemfrie og højtydende IT-løsninger, MS365-administration og pålidelig support til moderne virksomheder i hele Skandinavien.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Løsninger</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/#ms365" className="hover:text-white transition-colors">MS365 Integration</Link></li>
              <li><Link href="/#domain-migration" className="hover:text-white transition-colors">Domæne Migrering</Link></li>
              <li><Link href="/#it-support" className="hover:text-white transition-colors">IT Support & Helpdesk</Link></li>
              <li><Link href="/#rmm" className="hover:text-white transition-colors">RMM & Overvågning</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Virksomhed</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/#about" className="hover:text-white transition-colors">Om os</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privatlivspolitik</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Handelsbetingelser</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Kontakt</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Guldbergsgade 115<br/>2200 København N</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+45 27828427</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>kontakt@visby.it</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Visby IT. Alle rettigheder forbeholdes.
          </p>
          <div className="flex gap-4 text-primary-foreground/50 text-sm">
            <span>Org.nr: 556000-0000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
