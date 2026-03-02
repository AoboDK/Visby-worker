// client/src/pages/Download.tsx
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowDown, CheckCircle2, Monitor, Apple, Chrome, Download as DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downloadSupremoFile, detectOS, getBrowserName } from "@/utils/download";

export default function Download() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [os, setOs] = useState<'windows' | 'mac' | 'other'>('windows');
  const [browser, setBrowser] = useState('Chrome');

  useEffect(() => {
    setOs(detectOS());
    setBrowser(getBrowserName());
    
    // Auto-start download on page load
    const timer = setTimeout(() => {
      handleDownload();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    downloadSupremoFile();
  };

  const getDownloadLocationImage = () => {
    // Different instruction based on browser
    if (browser === 'Chrome' || browser === 'Edge') {
      return {
        position: 'øverst til højre',
        icon: <Chrome className="w-12 h-12 text-primary" />,
        description: 'Klik på download-ikonet øverst til højre i din browser'
      };
    } else if (browser === 'Safari') {
      return {
        position: 'øverst til højre',
        icon: <Apple className="w-12 h-12 text-primary" />,
        description: 'Klik på download-ikonet øverst til højre i din browser'
      };
    } else {
      return {
        position: 'i din browser',
        icon: <DownloadIcon className="w-12 h-12 text-primary" />,
        description: 'Find filen i din browsers download-område'
      };
    }
  };

  const downloadLocation = getDownloadLocationImage();
  const fileName = os === 'mac' ? 'action1_agent(VisbyIT).sh' : 'action1_agent(VisbyIT).msi';

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            {isDownloading ? (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500 animate-in zoom-in duration-300" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Din download er startet!
                </h1>
                <p className="text-xl text-muted-foreground">
                  {fileName} downloades nu
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                  <DownloadIcon className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Download Action1 Agent
                </h1>
              </>
            )}
          </div>

          {/* Instructions Card */}
          <Card className="mb-8 border-2 shadow-lg">
            <CardContent className="p-8 space-y-6">
              {/* Step 1 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">Find din download</h3>
                  <p className="text-muted-foreground">
                    Downloaden vises {downloadLocation.position} i {browser}
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-6 flex items-center justify-center gap-4 mt-4">
                    {downloadLocation.icon}
                    <ArrowDown className="w-8 h-8 text-muted-foreground animate-bounce" />
                    <div className="bg-background border-2 border-primary rounded-lg px-6 py-3 font-mono text-sm">
                      {fileName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">Åbn filen</h3>
                  <p className="text-muted-foreground">
                    {os === 'mac' 
                      ? 'Kør .sh filen i Terminal for at installere Action1 agent'
                      : 'Dobbeltklik på .msi filen for at installere Action1 agent'}
                  </p>
                  <div className="bg-secondary/50 rounded-lg p-4 flex items-center gap-3 mt-4">
                    {os === 'mac' ? (
                      <Apple className="w-8 h-8 text-muted-foreground" />
                    ) : (
                      <Monitor className="w-8 h-8 text-muted-foreground" />
                    )}
                    <p className="text-sm text-muted-foreground">
                      {os === 'mac' 
                        ? 'macOS kan bede om tilladelse til at åbne programmet'
                        : 'Windows kan bede om administrator-rettigheder'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold">Få support</h3>
                  <p className="text-muted-foreground">
                    Når Action1 agent er installeret, kan vores support-team forbinde til din computer og hjælpe dig
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retry Button */}
          {!isDownloading && (
            <div className="text-center">
              <Button 
                onClick={handleDownload}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8"
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Start Download
              </Button>
            </div>
          )}

          {isDownloading && (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Downloaden startede ikke?
              </p>
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="rounded-full"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Prøv igen
              </Button>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 p-6 bg-secondary/30 rounded-lg border">
            <h3 className="font-semibold mb-2">Brug for hjælp?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Kontakt vores support-team hvis du har problemer med at downloade eller installere Action1 agent
            </p>
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => window.location.href = '/contact'}
            >
              Kontakt Support
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
