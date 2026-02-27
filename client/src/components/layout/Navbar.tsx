// client/src/components/layout/Navbar.tsx
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadSupremoFile, getDownloadLocationText } from "@/utils/download";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    const downloadInfo = downloadSupremoFile();
    const locationText = getDownloadLocationText();
    
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span>Din download er klar!</span>
        </div>
      ),
      description: (
        <div className="space-y-1 mt-1">
          <p className="font-medium">{downloadInfo.fileName}</p>
          <p className="text-sm text-muted-foreground">
            Tjek {locationText} i din browser
          </p>
        </div>
      ),
      duration: 5000,
    });
  };

  const navItems = [
    { label: "Hjem", path: "/" },
    { label: "Ydelser", path: "/#services" },
    { label: "Kontakt", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Visby IT
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.path.includes('#') ? (
                <a
                  key={item.path}
                  href={item.path}
                  className="text-foreground/80 hover:text-accent transition-colors font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.path} href={item.path}>
                  <a
                    className={`text-foreground/80 hover:text-accent transition-colors font-medium ${
                      location === item.path ? "text-accent" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </Link>
              )
            ))}
            <Button 
              onClick={handleDownload}
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6"
            >
              <Download className="w-4 h-4 mr-2" />
              Få Support
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.path.includes('#') ? (
                  <a
                    key={item.path}
                    href={item.path}
                    className="text-foreground/80 hover:text-accent transition-colors font-medium px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.path} href={item.path}>
                    <a
                      className={`text-foreground/80 hover:text-accent transition-colors font-medium px-4 py-2 block ${
                        location === item.path ? "text-accent" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </Link>
                )
              ))}
              <div className="px-4">
                <Button 
                  onClick={() => {
                    handleDownload();
                    setIsOpen(false);
                  }}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Få Support
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
