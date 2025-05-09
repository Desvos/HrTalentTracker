import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Map, Users, BarChart, CheckCircle2, MapPin } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const LandingPage = () => {
  const [_, navigate] = useLocation();

  return (
    <PublicLayout
      title="HR Talent Mapper - Visualizza e analizza la distribuzione del talento"
      description="HR Talent Mapper è uno strumento per visualizzare geograficamente la distribuzione di candidati e analizzare le fonti di talento per il tuo team."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Trova e analizza i migliori talenti con la mappatura geografica
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Visualizza la distribuzione geografica dei candidati e scopri le principali fonti di talento con una mappa interattiva avanzata.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/signup')}
                >
                  Inizia subito
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Accedi
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-video bg-primary/10 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Map className="w-24 h-24 text-primary/50" />
                </div>
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">12</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Funzionalità chiave</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Map className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visualizzazione geografica</h3>
              <p className="text-muted-foreground">
                Mappa interattiva per visualizzare la distribuzione geografica dei candidati in tempo reale.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analisi delle fonti di talento</h3>
              <p className="text-muted-foreground">
                Identifica automaticamente le istituzioni e le aree geografiche che producono i migliori talenti.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analisi avanzate</h3>
              <p className="text-muted-foreground">
                Filtra e confronta i dati dei candidati in base a competenze, ruoli e formazione accademica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Perché scegliere HR Talent Mapper</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0 mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-medium mb-1">Decisioni di assunzione più informate</h3>
                <p className="text-muted-foreground">
                  Comprendi dove si trova il talento e identifica nuove aree di recruitment per diversificare il tuo pool di candidati.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0 mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-medium mb-1">Ottimizzazione del budget di recruitment</h3>
                <p className="text-muted-foreground">
                  Concentra gli sforzi di recruitment nelle aree ad alto potenziale rispetto alle tue esigenze specifiche.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0 mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-medium mb-1">Interfaccia intuitiva</h3>
                <p className="text-muted-foreground">
                  Nessuna competenza tecnica richiesta. Dashboard chiare e facili da usare per tutto il team HR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto a trasformare il tuo processo di recruitment?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Inizia oggi stesso a visualizzare e analizzare i dati dei candidati con HR Talent Mapper.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/signup')}
          >
            Crea un account gratuito
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;