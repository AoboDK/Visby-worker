import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Cloud, 
  ArrowRightLeft, 
  LifeBuoy, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const services = [
    {
      id: "ms365",
      icon: <Cloud className="w-8 h-8 text-accent" />,
      title: "MS365 Integration",
      description: "Vi leverer og administrerer Microsoft 365 Business med fokus på sikkerhed og korrekt opsætning. Dette inkluderer e-mail sikkerhed, arkivering og fuld backup af jeres 365-data, så I er beskyttet mod datatab i skyen."
    },
    {
      id: "domain-migration",
      icon: <ArrowRightLeft className="w-8 h-8 text-accent" />,
      title: "Domæne Migrering",
      description: "Sikker flytning af jeres digitale identitet. Vi håndterer overgangen fra IMAP eller Google til Microsoft 365 uden nedetid, og sørger for at alle mails, kalendere og kontakter kommer sikkert med over i den nye struktur."
    },
    {
      id: "it-support",
      icon: <LifeBuoy className="w-8 h-8 text-accent" />,
      title: "IT Support & Helpdesk",
      description: "Professionel hjælp når teknikken driller. Vores support dækker både hardware, software og netværk, og vi lægger vægt på at løse problemerne hurtigt, så jeres medarbejdere kan fortsætte deres arbejde uforstyrret."
    },
    {
      id: "rmm",
      icon: <Activity className="w-8 h-8 text-accent" />,
      title: "RMM & Overvågning",
      description: "Remote Monitoring and Management er fundamentet for stabil drift. Vi overvåger systemerne 24/7, installerer sikkerhedsopdateringer (patches) automatisk og fanger potentielle fejl, før de udvikler sig til driftsstop."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
          {/* Abstract Scandinavian background pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" 
               style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
          </div>
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium mb-8">
                <span className="flex h-2 w-2 rounded-full bg-accent"></span>
                Moderne IT-løsninger til Skandinavien
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-display font-bold tracking-tight text-balance mb-8">
                Moderne, Sikker og <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Driftssikker IT.</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
                Vi hjælper små og mellemstore virksomheder med at få styr på deres IT – sikkert, stabilt og uden kompleksitet. Én samlet løsning, fuld tryghed.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    Få en gratis konsultation
                  </Button>
                </Link>
                <Link href="#services">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-full bg-background hover:bg-secondary/50 border-border transition-all">
                    Udforsk ydelser
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* LOGO STRIP (Trust indicators) */}
        <section className="py-10 border-y border-border/50 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">Teknologier vi arbejder med</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Replace with actual SVGs in production, using text for structural placeholder */}
              <div className="font-display font-bold text-xl flex items-center gap-2"><Cloud className="w-5 h-5"/> Microsoft 365</div>
              <div className="font-display font-bold text-xl flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> Intune</div>
              <div className="font-display font-bold text-xl flex items-center gap-2"><Zap className="w-5 h-5"/> Azure AD</div>
              <div className="font-display font-bold text-xl flex items-center gap-2"><Activity className="w-5 h-5"/> NinjaONE</div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 md:flex md:justify-between md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Kernekompetencer.</h2>
                <p className="text-lg text-muted-foreground">Alt hvad din virksomhed har brug for for at operere sikkert og effektivt i skyen.</p>
              </div>
              <Link href="/contact" className="hidden md:inline-flex items-center gap-2 text-accent font-medium hover:underline mt-4 md:mt-0">
                Drøft din infrastruktur <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  id={service.id}
                  className="group p-8 rounded-2xl border border-border/50 bg-card hover:shadow-xl hover:shadow-black/5 hover:border-border transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                  
                  <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center mb-6 border border-white/50 relative z-10">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 relative z-10">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US SECTION (Minimalist text block) */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Én samlet IT-partner.</h2>
                <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                  I stedet for flere leverandører og uklare ansvarsforhold får I én fast kontakt, klar ansvarsfordeling og professionel rådgivning. Vi tager ansvar for helheden.
                </p>
                <ul className="space-y-4">
                  {[
                    "Compliance & Datasikkerhed (GDPR)",
                    "Proaktiv overvågning & Patch management",
                    "Automatisk backup & testet gendannelse"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-primary-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 space-y-8">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="w-8 h-8 text-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold font-display mb-2">Sikkerhed først</h4>
                      <p className="text-primary-foreground/70">Beskyttelse mod Ransomware, Phishing og Malware som en integreret del af løsningen.</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-white/10"></div>
                  <div className="flex items-start gap-4">
                    <Activity className="w-8 h-8 text-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold font-display mb-2">Proaktiv drift</h4>
                      <p className="text-primary-foreground/70">Vi overvåger jeres IT løbende og fanger problemer, før de påvirker jeres hverdag.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5"></div>
          <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Klar til at opgradere din IT?</h2>
            <p className="text-xl text-muted-foreground mb-10 text-balance">
              Lad os tage en snak om, hvordan vi kan strømline jeres drift, sikre jeres data og støtte jeres team.
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-14 px-10 text-base rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Start dialogen
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
