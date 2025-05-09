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
    description: 'Perfect for small HR teams',
    price: {
      monthly: '€49',
      yearly: '€39',
    },
    features: [
      'Up to 200 candidates',
      'Basic geographic visualization',
      'Role and skills filters',
      '1 user',
      'Data export (CSV)',
      'Email support'
    ],
    cta: 'Start for free'
  },
  {
    name: 'Pro',
    description: 'Ideal for growing companies',
    price: {
      monthly: '€99',
      yearly: '€79',
    },
    features: [
      'Up to 1,000 candidates',
      'Advanced geographic visualization',
      'All available filters',
      'Up to 5 users',
      'Talent source analysis',
      'Data export (CSV, Excel)',
      'Integrated API',
      'Priority support'
    ],
    cta: 'Try 14 days free',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'For large companies with complex needs',
    price: {
      monthly: '€249',
      yearly: '€199',
    },
    features: [
      'Unlimited candidates',
      'Custom geographic visualization',
      'Custom analytics dashboards',
      'Unlimited users',
      'Integration with your ATS',
      'Advanced data export',
      'Reporting features',
      'Custom APIs',
      'Dedicated account manager'
    ],
    cta: 'Contact us'
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
            Frequently Asked Questions
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-medium text-gray-900">Can I change plans later?</h3>
              <p className="mt-2 text-gray-500">
                Absolutely! You can upgrade to a higher plan at any time. If you downgrade, the change will be applied at the end of your current billing period.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">How does the free trial work?</h3>
              <p className="mt-2 text-gray-500">
                The 14-day free trial gives you full access to the Pro plan. No credit card required to start.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">What counts as a "candidate"?</h3>
              <p className="mt-2 text-gray-500">
                A candidate is any profile uploaded to the system. You can modify, update, or remove profiles at any time without affecting the count.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">Is implementation support included?</h3>
              <p className="mt-2 text-gray-500">
                Enterprise customers receive full implementation support. For Base and Pro plans, we offer detailed guides and email support.
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