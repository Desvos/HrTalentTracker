import { useState } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAuth } from '@/contexts/AuthContext';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: { name: string; included: boolean }[];
  popular?: boolean;
}

const PricingPage = () => {
  const [_, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  
  const pricingTiers: PricingTier[] = [
    {
      name: 'Basic',
      price: '$99',
      description: 'Perfect for small recruiting teams',
      features: [
        { name: 'Up to 500 candidate profiles', included: true },
        { name: 'Basic talent mapping functionality', included: true },
        { name: 'CSV data import/export', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom reports', included: false }
      ]
    },
    {
      name: 'Professional',
      price: '$249',
      description: 'Ideal for growing HR departments',
      features: [
        { name: 'Up to 2,000 candidate profiles', included: true },
        { name: 'Advanced talent mapping and analytics', included: true },
        { name: 'API integration capabilities', included: true },
        { name: 'Priority email and chat support', included: true },
        { name: 'Basic custom reports', included: true },
        { name: 'Talent forecasting', included: false }
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$499',
      description: 'For large organizations with complex needs',
      features: [
        { name: 'Unlimited candidate profiles', included: true },
        { name: 'Full suite of talent mapping tools', included: true },
        { name: 'Advanced API and integration options', included: true },
        { name: '24/7 dedicated support with SLA', included: true },
        { name: 'Comprehensive custom reports', included: true },
        { name: 'Talent forecasting and projections', included: true }
      ]
    }
  ];
  
  const faqs = [
    {
      question: 'Can I upgrade or downgrade my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'We offer a 14-day free trial for all our plans. No credit card required to start your trial.'
    },
    {
      question: 'How secure is my data?',
      answer: 'We take data security very seriously. All your data is encrypted both in transit and at rest, and we comply with industry-standard security protocols.'
    },
    {
      question: 'Can I export my data if I decide to cancel?',
      answer: 'Yes, you can export all your data in standard formats (CSV, JSON) at any time, including after you decide to cancel your subscription.'
    },
    {
      question: 'Do you offer custom enterprise solutions?',
      answer: 'Yes, we offer custom enterprise solutions tailored to your organization\'s specific needs. Please contact our sales team for more information.'
    }
  ];
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };
  
  return (
    <AppLayout>
      <Helmet>
        <title>Pricing | HR Talent Mapper</title>
        <meta name="description" content="Explore HR Talent Mapper's flexible pricing plans designed to scale with your organization's growth and recruitment needs." />
      </Helmet>
      
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Choose the Right Plan for Your HR Needs</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our pricing plans are designed to scale with your organization's growth, offering flexible options for businesses of all sizes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <div 
            key={index} 
            className={`pricing-card relative ${tier.popular ? 'transform scale-105 z-10' : ''}`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 -mt-3 -mr-3">
                <Badge className="bg-primary text-white shadow-lg">
                  POPULAR
                </Badge>
              </div>
            )}
            
            <CardHeader className={`${tier.popular ? 'bg-primary/10 border-b border-primary' : 'bg-muted border-b'}`}>
              <CardTitle className={`text-xl text-center ${tier.popular ? 'text-primary' : ''}`}>
                {tier.name}
              </CardTitle>
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-center text-muted-foreground">{tier.description}</p>
            </CardHeader>
            
            <CardContent className="p-6">
              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <Check className="text-green-500 mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    ) : (
                      <X className="text-muted-foreground mt-1 mr-3 h-5 w-5 flex-shrink-0 opacity-50" />
                    )}
                    <span className={feature.included ? '' : 'opacity-50'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button 
                  className="w-full" 
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              </div>
            </CardContent>
          </div>
        ))}
      </div>
      
      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AppLayout>
  );
};

export default PricingPage;
