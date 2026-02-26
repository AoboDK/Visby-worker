import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { insertContactMessageSchema, type ContactMessageInput } from "@shared/routes";
import { useSubmitContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactMessageInput>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactMessageInput) => {
    submitContact.mutate(data, {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "Besked sendt",
          description: "Vi har modtaget din henvendelse og vender tilbage hurtigst muligt.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Fejl ved afsendelse",
          description: error.message,
        });
      }
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Kontakt os.</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Uanset om du har brug for akut IT-support, en omfattende MS365-migrering eller blot ønsker at drøfte jeres infrastruktur, står vores eksperter klar til at hjælpe.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* Contact Information Panel */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="lg:col-span-2 bg-primary text-primary-foreground rounded-3xl p-8 lg:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <h3 className="text-2xl font-display font-bold mb-8 relative z-10">Kontaktinformation</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Kontoradresse</h4>
                    <p className="text-primary-foreground/70">Guldbergsgade 115<br/>2200 København N</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Telefon</h4>
                    <p className="text-primary-foreground/70">+45 27828427</p>
                    <p className="text-primary-foreground/50 text-sm mt-1">Man-Fre 08:00 - 17:00 CET</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p className="text-primary-foreground/70">kontakt@visby.it</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="lg:col-span-3 bg-card border border-border/50 rounded-3xl p-8 lg:p-10 shadow-xl shadow-black/5"
            >
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Besked modtaget!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Tak fordi du kontaktede os. En af vores IT-specialister vil gennemgå din henvendelse og kontakte dig inden for 24 timer.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSuccess(false)}
                    className="rounded-full px-8"
                  >
                    Send en ny besked
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-display font-bold mb-6">Send os en besked</h3>
                  
                  {submitContact.isError && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Fejl</AlertTitle>
                      <AlertDescription>
                        {submitContact.error?.message || "Noget gik galt."}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Fulde navn</FormLabel>
                              <FormControl>
                                <Input placeholder="Mads Jensen" className="h-12 rounded-xl bg-background border-border focus-visible:ring-accent/20 focus-visible:border-accent" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">E-mail adresse</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="mads@virksomhed.dk" className="h-12 rounded-xl bg-background border-border focus-visible:ring-accent/20 focus-visible:border-accent" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Telefonnummer (valgfrit)</FormLabel>
                              <FormControl>
                                <Input placeholder="+45 12 34 56 78" className="h-12 rounded-xl bg-background border-border focus-visible:ring-accent/20 focus-visible:border-accent" {...field} value={field.value || ''} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Virksomhed (valgfrit)</FormLabel>
                              <FormControl>
                                <Input placeholder="Virksomhed ApS" className="h-12 rounded-xl bg-background border-border focus-visible:ring-accent/20 focus-visible:border-accent" {...field} value={field.value || ''} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Hvordan kan vi hjælpe?</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Fortæl os om jeres IT-behov, nuværende udfordringer eller de ydelser, I er interesserede i..." 
                                className="min-h-[150px] resize-none rounded-xl bg-background border-border focus-visible:ring-accent/20 focus-visible:border-accent p-4" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={submitContact.isPending}
                        className="w-full h-14 text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        {submitContact.isPending ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></span>
                            Sender...
                          </span>
                        ) : (
                          <>
                            Send forespørgsel <Send className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </Button>

                    </form>
                  </Form>
                </>
              )}
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
