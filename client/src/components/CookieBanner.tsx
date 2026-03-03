// client/src/components/CookieBanner.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after 1 second delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setShowBanner(false);
  };

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", "none");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] animate-in fade-in duration-300" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 animate-in slide-in-from-bottom duration-300">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-background border-2 border-border rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              {/* Cookie Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary" />
              </div>

              <div className="flex-1 space-y-4">
                {/* Title and Description */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">
                    Vi bruger cookies
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Vi bruger cookies for at sikre, at vores hjemmeside fungerer korrekt og 
                    for at forbedre din oplevelse. Ved at klikke "Accepter alle" accepterer 
                    du brugen af alle cookies.
                  </p>
                </div>

                {/* Details Section (expandable) */}
                {showDetails && (
                  <div className="space-y-3 text-sm">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h3 className="font-semibold mb-2">🔒 Nødvendige cookies (Altid aktive)</h3>
                      <p className="text-muted-foreground">
                        Disse cookies er nødvendige for, at hjemmesiden kan fungere korrekt. 
                        De inkluderer sikkerhedscookies fra Cloudflare og session-cookies.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h3 className="font-semibold mb-2">📊 Funktionelle cookies</h3>
                      <p className="text-muted-foreground">
                        Bruges til at huske dine præferencer og forbedre din oplevelse på sitet.
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground pt-2">
                      Du kan læse mere om vores brug af cookies i vores{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        privatlivspolitik
                      </a>
                      .
                    </p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={acceptAll}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                  >
                    Accepter alle
                  </Button>
                  
                  <Button
                    onClick={acceptNecessary}
                    variant="outline"
                    className="rounded-full"
                  >
                    Kun nødvendige
                  </Button>

                  <Button
                    onClick={rejectAll}
                    variant="ghost"
                    className="rounded-full"
                  >
                    Afvis alle
                  </Button>

                  <Button
                    onClick={() => setShowDetails(!showDetails)}
                    variant="ghost"
                    className="rounded-full sm:ml-auto"
                  >
                    {showDetails ? "Skjul detaljer" : "Vis detaljer"}
                  </Button>
                </div>
              </div>

              {/* Close button (for accepting necessary only) */}
              <button
                onClick={acceptNecessary}
                className="flex-shrink-0 p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Luk"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
