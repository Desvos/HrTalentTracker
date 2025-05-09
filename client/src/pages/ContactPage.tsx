import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Check 
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Message sent",
        description: "We'll get back to you soon!",
      });
    }, 1500);
  };

  return (
    <PublicLayout
      title="Contatti - HR Talent Mapper"
      description="Contatta il nostro team per saperne di più su HR Talent Mapper o per richiedere assistenza."
    >
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Contattaci
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            Hai domande o hai bisogno di assistenza? Il nostro team è qui per aiutarti.
          </p>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informazioni di contatto</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Telefono</h3>
                    <p className="mt-1 text-gray-600">+39 02 1234 5678</p>
                    <p className="mt-1 text-gray-600">Lun-Ven, 9:00-18:00 CET</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">info@hrtalentmapper.it</p>
                    <p className="mt-1 text-gray-600">supporto@hrtalentmapper.it</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Sede</h3>
                    <p className="mt-1 text-gray-600">
                      Via dell'Innovazione, 42<br />
                      20123 Milano, Italia
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Seguici</h2>
                <div className="flex space-x-4">
                  {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map((social) => (
                    <a 
                      key={social}
                      href="#"
                      className="text-gray-500 hover:text-primary transition-colors"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-8">
                  <div className="bg-green-100 text-green-800 rounded-full p-3 mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you for contacting us!</h3>
                  <p className="text-gray-600">
                    We have received your message. A member of our team will get back to you soon.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" rows={5} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send message'}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section - This would be a real map in a production app */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-200">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <MapPin className="h-16 w-16 text-primary/40" />
              <span className="absolute text-gray-600 font-medium">Mappa della sede</span>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ContactPage;