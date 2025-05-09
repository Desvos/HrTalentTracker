import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Users, Globe, Award, Lightbulb } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const AboutPage = () => {
  const [_, navigate] = useLocation();

  return (
    <PublicLayout
      title="Chi siamo - HR Talent Mapper"
      description="Scopri la nostra missione: aiutare le aziende a trovare e visualizzare i migliori talenti in tutto il mondo."
    >
      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            La nostra missione
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            Vogliamo rivoluzionare il modo in cui le aziende scoprono e analizzano i talenti attraverso la visualizzazione geografica e l'analisi avanzata.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">La nostra storia</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  HR Talent Mapper è nata nel 2022 da un'idea semplice ma potente: le aziende dovrebbero poter vedere a colpo d'occhio dove si trovano i talenti nel mondo.
                </p>
                <p>
                  I nostri fondatori, con esperienza decennale nei settori HR e tecnologico, hanno riconosciuto che le aziende spendevano troppo tempo cercando di capire dove concentrare i loro sforzi di recruiting.
                </p>
                <p>
                  Abbiamo costruito la nostra piattaforma da zero, concentrandoci sulla facilità d'uso e sulla potenza analitica, per offrire ai professionisti HR una soluzione che trasforma i dati grezzi in insight strategici.
                </p>
                <p>
                  Oggi, serviamo centinaia di aziende in tutto il mondo, aiutandole a scoprire talenti in modi che prima non erano possibili.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="aspect-w-4 aspect-h-3 bg-primary/10 rounded-lg overflow-hidden flex items-center justify-center">
                <Globe className="w-32 h-32 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly push the boundaries of what's possible with data and visualizations, always seeking new ways to help our customers.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We believe the best solutions come from collaboration with our customers, partners, and within our teams.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the quality of our product to the support we provide to our customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Il nostro team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Marco Rossi',
                role: 'CEO & Co-fondatore',
                bio: 'Ex-Director of Talent Acquisition in aziende Fortune 500, Marco ha una passione per l\'innovazione nel settore HR.'
              },
              {
                name: 'Laura Bianchi',
                role: 'CTO & Co-fondatrice',
                bio: 'Con un background in visualizzazione dati e machine learning, Laura guida lo sviluppo della nostra piattaforma tecnologica.'
              },
              {
                name: 'Giovanni Verdi',
                role: 'Head of Customer Success',
                bio: 'Giovanni si assicura che ogni cliente ottenga il massimo valore dalla nostra piattaforma, con oltre 10 anni di esperienza in ruoli di consulenza.'
              }
            ].map((person, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary text-2xl font-bold">{person.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-xl font-bold">{person.name}</h3>
                  <p className="text-primary font-medium mb-4">{person.role}</p>
                  <p className="text-gray-600">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Unisciti a noi nella nostra missione
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Scopri come HR Talent Mapper può trasformare il tuo processo di talent acquisition.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
            >
              Inizia ora
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Contattaci
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default AboutPage;