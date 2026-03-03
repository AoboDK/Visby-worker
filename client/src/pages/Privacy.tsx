// client/src/pages/Privacy.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Shield, Mail, Database, Lock, Users, Eye } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Privatlivspolitik
            </h1>
            <p className="text-lg text-muted-foreground">
              Sidst opdateret: {new Date().toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Introduktion
              </h2>
              <p className="text-muted-foreground mb-4">
                Hos Visby IT tager vi dit privatliv alvorligt. Denne privatlivspolitik forklarer, 
                hvordan vi indsamler, bruger og beskytter dine personoplysninger, når du besøger 
                vores hjemmeside <strong>visby.it</strong>.
              </p>
              <p className="text-muted-foreground">
                Vi er forpligtet til at beskytte dine personoplysninger i overensstemmelse med 
                den generelle databeskyttelsesforordning (GDPR) og dansk databeskyttelseslovgivning.
              </p>
            </section>

            {/* Dataansvarlig */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                Dataansvarlig
              </h2>
              <div className="bg-secondary/50 rounded-lg p-6 space-y-2">
                <p><strong>Virksomhed:</strong> Visby IT</p>
                <p><strong>Adresse:</strong> Guldbergsgade 115, 2200 København N</p>
                <p><strong>Email:</strong> kontakt@visby.it</p>
                <p><strong>Telefon:</strong> +45 27828427</p>
              </div>
            </section>

            {/* Hvilke oplysninger indsamler vi */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-primary" />
                Hvilke oplysninger indsamler vi?
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">1. Kontaktformular</h3>
                  <p className="text-muted-foreground mb-3">
                    Når du udfylder vores kontaktformular, indsamler vi følgende oplysninger:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Navn</li>
                    <li>Email-adresse</li>
                    <li>Telefonnummer (valgfrit)</li>
                    <li>Virksomhedsnavn (valgfrit)</li>
                    <li>Besked/henvendelse</li>
                    <li>IP-adresse (til sikkerhedsformål)</li>
                    <li>Tidspunkt for henvendelse</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">2. Cookies og automatisk indsamlede data</h3>
                  <p className="text-muted-foreground mb-3">
                    Vi bruger følgende typer cookies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Nødvendige cookies:</strong> Sikkerhedscookies fra Cloudflare til beskyttelse mod DDoS-angreb</li>
                    <li><strong>Funktionelle cookies:</strong> Cookie-præferencer og session-cookies</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    Vi bruger <strong>ikke</strong> tracking-cookies, marketing-cookies eller 
                    tredjepartscookies til analyse.
                  </p>
                </div>
              </div>
            </section>

            {/* Hvordan bruger vi dine oplysninger */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                Hvordan bruger vi dine oplysninger?
              </h2>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Vi bruger dine personoplysninger til følgende formål:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Kontakt:</strong> At besvare dine henvendelser og forespørgsler</li>
                  <li><strong>Support:</strong> At levere teknisk support og IT-services</li>
                  <li><strong>Sikkerhed:</strong> At beskytte vores hjemmeside mod spam og misbrug</li>
                  <li><strong>Drift:</strong> At sikre hjemmesidens funktionalitet og sikkerhed</li>
                </ul>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-800">
                    ✓ Vi sælger <strong>aldrig</strong> dine oplysninger til tredjeparter<br />
                    ✓ Vi deler <strong>ikke</strong> dine oplysninger med marketingfirmaer<br />
                    ✓ Vi sender <strong>ikke</strong> uopfordret markedsføring
                  </p>
                </div>
              </div>
            </section>

            {/* Retsgrundlag */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                Retsgrundlag for behandling
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Vi behandler dine personoplysninger baseret på følgende retsgrundlag:
              </p>
              
              <div className="space-y-3">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Samtykke (GDPR Art. 6(1)(a))</h3>
                  <p className="text-sm text-muted-foreground">
                    Når du udfylder kontaktformularen, giver du samtykke til, at vi behandler 
                    dine oplysninger for at besvare din henvendelse.
                  </p>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Legitim interesse (GDPR Art. 6(1)(f))</h3>
                  <p className="text-sm text-muted-foreground">
                    Vi har en legitim interesse i at beskytte vores hjemmeside mod spam og 
                    sikkerhedstrusler (IP-logging, rate limiting).
                  </p>
                </div>
              </div>
            </section>

            {/* Opbevaring */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-primary" />
                Hvor længe opbevarer vi dine data?
              </h2>
              
              <ul className="list-disc list-inside space-y-3 text-muted-foreground ml-4">
                <li>
                  <strong>Kontaktformular-data:</strong> Slettes senest 12 måneder efter henvendelsen, 
                  med mindre du bliver kunde (i så fald opbevares data i henhold til bogføringslovens krav)
                </li>
                <li>
                  <strong>IP-adresser:</strong> Logges i 30 dage til sikkerhedsformål
                </li>
                <li>
                  <strong>Cookie-præferencer:</strong> Gemmes lokalt i din browser indtil du sletter dem
                </li>
              </ul>
            </section>

            {/* Deling af data */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                Deling af data med tredjeparter
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Vi deler kun dine oplysninger med følgende tredjepartsleverandører, 
                der er nødvendige for driften af vores hjemmeside:
              </p>
              
              <div className="space-y-3">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Cloudflare (USA)</h3>
                  <p className="text-sm text-muted-foreground">
                    Hosting og CDN-tjenester. Cloudflare er certificeret under EU-US Data Privacy Framework.
                  </p>
                </div>
                
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Resend (USA)</h3>
                  <p className="text-sm text-muted-foreground">
                    Email-levering for kontaktformularen. Data behandles i overensstemmelse med GDPR.
                  </p>
                </div>
              </div>
            </section>

            {/* Dine rettigheder */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Dine rettigheder under GDPR
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Du har følgende rettigheder i forhold til dine personoplysninger:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-1">Ret til indsigt</h3>
                  <p className="text-sm text-muted-foreground">
                    Du kan anmode om en kopi af de personoplysninger, vi har om dig.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-1">Ret til berigtigelse</h3>
                  <p className="text-sm text-muted-foreground">
                    Du kan få rettet forkerte eller ufuldstændige oplysninger.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-1">Ret til sletning ("retten til at blive glemt")</h3>
                  <p className="text-sm text-muted-foreground">
                    Du kan anmode om, at vi sletter dine personoplysninger.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-1">Ret til begrænsning</h3>
                  <p className="text-sm text-muted-foreground">
                    Du kan anmode om, at vi begrænser behandlingen af dine oplysninger.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-1">Ret til dataportabilitet</h3>
                  <p className="text-sm text-muted-foreground">
                    Du kan få dine data i et struktureret, maskinlæsbart format.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold mb-1">Ret til indsigelse</h3>
                  <p className="text-sm text-muted-foreground">
                    Du kan gøre indsigelse mod behandling af dine personoplysninger.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  For at udøve dine rettigheder, kontakt os på:{" "}
                  <a href="mailto:kontakt@visby.it" className="text-primary font-semibold hover:underline">
                    kontakt@visby.it
                  </a>
                </p>
              </div>
            </section>

            {/* Sikkerhed */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                Sikkerhed
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Vi implementerer passende tekniske og organisatoriske sikkerhedsforanstaltninger 
                for at beskytte dine personoplysninger mod tab, misbrug eller uautoriseret adgang:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>SSL/TLS-kryptering på hele hjemmesiden (HTTPS)</li>
                <li>Rate limiting til beskyttelse mod spam og brute-force-angreb</li>
                <li>Input-validering og sanitering</li>
                <li>Regelmæssige sikkerhedsopdateringer</li>
                <li>Begrænset adgang til personoplysninger</li>
              </ul>
            </section>

            {/* Klageadgang */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4">Klageadgang</h2>
              
              <p className="text-muted-foreground mb-4">
                Hvis du mener, at vi ikke overholder databeskyttelsesreglerne, har du ret til 
                at indgive en klage til Datatilsynet:
              </p>
              
              <div className="bg-secondary/50 rounded-lg p-4">
                <p><strong>Datatilsynet</strong></p>
                <p className="text-sm text-muted-foreground">Carl Jacobsens Vej 35</p>
                <p className="text-sm text-muted-foreground">2500 Valby</p>
                <p className="text-sm text-muted-foreground">Telefon: 33 19 32 00</p>
                <p className="text-sm text-muted-foreground">Email: dt@datatilsynet.dk</p>
                <p className="text-sm text-muted-foreground">Website: www.datatilsynet.dk</p>
              </div>
            </section>

            {/* Ændringer */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-4">Ændringer til denne politik</h2>
              
              <p className="text-muted-foreground">
                Vi forbeholder os retten til at opdatere denne privatlivspolitik. 
                Væsentlige ændringer vil blive meddelt på vores hjemmeside. 
                Vi opfordrer dig til regelmæssigt at gennemgå denne side for at holde dig 
                opdateret om, hvordan vi beskytter dine oplysninger.
              </p>
            </section>

            {/* Kontakt */}
            <section className="bg-primary/10 rounded-2xl p-8 border-2 border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Kontakt os</h2>
              
              <p className="text-muted-foreground mb-4">
                Hvis du har spørgsmål til denne privatlivspolitik eller ønsker at udøve dine rettigheder, 
                er du velkommen til at kontakte os:
              </p>
              
              <div className="space-y-2">
                <p><strong>Email:</strong>{" "}
                  <a href="mailto:kontakt@visby.it" className="text-primary hover:underline">
                    kontakt@visby.it
                  </a>
                </p>
                <p><strong>Telefon:</strong> +45 27828427</p>
                <p><strong>Adresse:</strong> Guldbergsgade 115, 2200 København N</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
