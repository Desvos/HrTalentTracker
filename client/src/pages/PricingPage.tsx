import { useState } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CheckCircle2 } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly: string;
    yearly: string;
  };
  features: string[];
  cta: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Base',
    description: 'Perfetto per team HR di piccole dimensioni',
    price: {
      monthly: '€49',
      yearly: '€39',
    },
    features: [
      'Fino a 200 candidati',
      'Visualizzazione geografica di base',
      'Filtri per ruolo e competenze',
      '1 utente', 
      'Esportazione dati (CSV)',
      'Supporto email'
    ],
    cta: 'Inizia gratuitamente'
  },
  {
    name: 'Pro',
    description: 'Ideale per aziende in crescita',
    price: {
      monthly: '€99',
      yearly: '€79',
    },
    features: [
      'Fino a 1.000 candidati',
      'Visualizzazione geografica avanzata',
      'Tutti i filtri disponibili',
      'Fino a 5 utenti',
      'Analisi delle fonti di talento',
      'Esportazione dati (CSV, Excel)',
      'API integrate',
      'Supporto prioritario'
    ],
    cta: 'Prova 14 giorni gratis',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'Per grandi aziende con esigenze complesse',
    price: {
      monthly: '€249',
      yearly: '€199',
    },
    features: [
      'Candidati illimitati',
      'Visualizzazione geografica personalizzata',
      'Dashboard analitici personalizzati',
      'Utenti illimitati',
      'Integrazione con i tuoi ATS',
      'Esportazione dati avanzata',
      'Funzionalità di reportistica',
      'API personalizzate',
      'Account manager dedicato'
    ],
    cta: 'Contattaci'
  }
];

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [_, navigate] = useLocation();
  
  return (
    <PublicLayout
      title="Prezzi - HR Talent Mapper"
      description="Scegli il piano perfetto per le tue esigenze. Offriamo piani flessibili per team di ogni dimensione."
    >
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Prezzi semplici e trasparenti
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            Scegli il piano più adatto alle tue esigenze. Tutti i piani includono l'accesso alla nostra piattaforma di visualizzazione geografica dei talenti.
          </p>
          
          <div className="mt-12 flex justify-center">
            <div className="relative flex items-center">
              <span className={`text-sm mr-4 ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Mensile
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={setIsAnnual}
                id="billing-toggle"
              />
              <span className={`text-sm ml-4 ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Annuale <span className="text-green-600 font-medium">(20% di sconto)</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name}
                className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${
                  tier.popular 
                    ? 'border-2 border-primary relative' 
                    : 'border border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                    Più popolare
                  </div>
                )}
                
                <div className="px-6 py-8 bg-white">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {tier.name}
                    </h3>
                    <p className="mt-2 text-gray-500">{tier.description}</p>
                    <div className="mt-6">
                      <p className="text-5xl font-extrabold text-gray-900">
                        {isAnnual ? tier.price.yearly : tier.price.monthly}
                        <span className="text-xl font-medium text-gray-500 ml-2">/mese</span>
                      </p>
                      {isAnnual && (
                        <p className="mt-1 text-sm text-gray-500">
                          Fatturato annualmente ({parseInt(tier.price.yearly.replace('€', '')) * 12}€/anno)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 px-6 py-8 bg-gray-50 space-y-6">
                  <ul className="space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button 
                      className="w-full"
                      onClick={() => navigate(tier.name === 'Enterprise' ? '/contact' : '/signup')}
                      size="lg"
                      variant={tier.popular ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-5xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Domande frequenti
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-medium text-gray-900">Posso cambiare piano in un secondo momento?</h3>
              <p className="mt-2 text-gray-500">
                Certamente! Puoi passare a un piano superiore in qualsiasi momento. Se passi a un piano inferiore, la modifica verrà applicata al termine del periodo di fatturazione corrente.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">Come funziona la prova gratuita?</h3>
              <p className="mt-2 text-gray-500">
                La prova gratuita di 14 giorni ti offre accesso completo al piano Pro. Non è necessaria alcuna carta di credito per iniziare.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">Cosa si intende per "candidato"?</h3>
              <p className="mt-2 text-gray-500">
                Un candidato è qualsiasi profilo caricato nel sistema. Puoi modificare, aggiornare o rimuovere i profili in qualsiasi momento senza influire sul conteggio.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">È previsto un supporto per l'implementazione?</h3>
              <p className="mt-2 text-gray-500">
                I clienti Enterprise ricevono un supporto completo per l'implementazione. Per i piani Base e Pro, offriamo guide dettagliate e supporto via email.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Hai altre domande?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Il nostro team è pronto ad aiutarti a scegliere il piano giusto per le tue esigenze.
          </p>
          <div className="mt-8">
            <Button 
              size="lg"
              onClick={() => navigate('/contact')}
              variant="outline"
            >
              Contattaci
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PricingPage;