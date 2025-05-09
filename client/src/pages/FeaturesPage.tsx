import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Map, 
  BarChart2, 
  FileText, 
  Layers, 
  Filter, 
  Zap, 
  Users, 
  Lock,
  ArrowRight 
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const FeaturesPage = () => {
  const [_, navigate] = useLocation();

  return (
    <PublicLayout
      title="Funzionalità - HR Talent Mapper"
      description="Scopri tutte le funzionalità di HR Talent Mapper: dalla visualizzazione geografica all'analisi delle fonti di talento."
    >
      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Scopri le potenti funzionalità di HR Talent Mapper
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            La nostra piattaforma offre strumenti avanzati di visualizzazione e analisi per aiutarti a prendere decisioni informate sul recruiting.
          </p>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-16">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
                  Visualizzazione
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Mappa geografica interattiva</h2>
                <p className="text-gray-600 mb-6">
                  Visualizza la distribuzione geografica dei candidati in tempo reale. La nostra mappa interattiva ti permette di:
                </p>
                <ul className="space-y-3">
                  {[
                    'Visualizzare la concentrazione di talenti per aree geografiche',
                    'Identificare "hotspot" di talento a colpo d\'occhio',
                    'Filtrare per competenze, ruoli e formazione',
                    'Eseguire zoom e panoramiche per analisi dettagliate'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 bg-gray-50 rounded-lg p-8">
                <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg shadow-sm overflow-hidden flex items-center justify-center">
                  <Map className="w-24 h-24 text-primary/30" />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg shadow-sm overflow-hidden flex items-center justify-center">
                  <BarChart2 className="w-24 h-24 text-primary/30" />
                </div>
              </div>
              <div>
                <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
                  Analisi
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard analitici avanzati</h2>
                <p className="text-gray-600 mb-6">
                  Ottieni insight potenti con i nostri dashboard analitici che ti permettono di:
                </p>
                <ul className="space-y-3">
                  {[
                    'Analizzare la distribuzione di competenze per ruolo e regione',
                    'Identificare le istituzioni che formano i candidati con competenze specifiche',
                    'Confrontare diverse aree geografiche per densità di talento',
                    'Monitorare trend e variazioni nel tempo'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
                  Filtri
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Filtri di ricerca potenti</h2>
                <p className="text-gray-600 mb-6">
                  Trova esattamente ciò che stai cercando con i nostri filtri avanzati:
                </p>
                <ul className="space-y-3">
                  {[
                    'Filtra per ruolo, competenza specifica, o combinazioni di skill',
                    'Cerca per istituzione formativa o background accademico',
                    'Filtra per area geografica e disponibilità al trasferimento',
                    'Combina filtri per ricerche altamente specifiche'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 bg-gray-50 rounded-lg p-8">
                <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg shadow-sm overflow-hidden flex items-center justify-center">
                  <Filter className="w-24 h-24 text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Other features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-6 w-6" />,
                title: 'Data export',
                description: 'Easily export your data in different formats (CSV, Excel) for further analysis or reporting.'
              },
              {
                icon: <Layers className="h-6 w-6" />,
                title: 'Talent source analysis',
                description: 'Identify institutions and geographic areas that produce candidates with the skills you\'re looking for.'
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: 'API integration',
                description: 'Integrate HR Talent Mapper with your existing HR tools through our RESTful APIs.'
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: 'Team management',
                description: 'Collaborate with your team by assigning roles and permissions for controlled platform access.'
              },
              {
                icon: <Lock className="h-6 w-6" />,
                title: 'Advanced security',
                description: 'Your data is protected with advanced encryption and industry-standard security measures.'
              },
              {
                icon: <BarChart2 className="h-6 w-6" />,
                title: 'Custom reports',
                description: 'Create custom and scheduled reports to share key insights with stakeholders.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Integrates with your favorite tools
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-3xl mx-auto">
            HR Talent Mapper seamlessly integrates with the leading ATS and HR tools on the market.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {['Workday', 'SAP SuccessFactors', 'Oracle HCM', 'Greenhouse', 'Lever', 'Taleo', 'BambooHR', 'Recruitee'].map((tool, index) => (
              <div key={index} className="bg-gray-50 rounded-lg px-6 py-4 text-gray-700 font-medium">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Pronto a trasformare il tuo processo di talent acquisition?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Scopri come HR Talent Mapper può aiutarti a trovare i migliori talenti in tutto il mondo.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="group"
            >
              Inizia ora
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default FeaturesPage;