import { useState } from 'react';
import PublicCVUploader from '@/pages/PublicCVUploader';
import { Card, CardContent } from '@/components/ui/card';

const PublicCVUploadPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Carica il tuo CV</h1>
          <p className="text-muted-foreground">
            Compila il form sottostante per caricare il tuo CV. I nostri recruiter lo esamineranno al più presto.
          </p>
        </div>

        {isSuccess ? (
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <h2 className="text-2xl font-semibold text-green-600">Grazie per aver caricato il tuo CV!</h2>
              <p>
                Abbiamo ricevuto il tuo CV e lo esamineremo al più presto.
                Ti contatteremo se il tuo profilo corrisponde alle nostre esigenze.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-primary hover:underline"
              >
                Carica un altro CV
              </button>
            </CardContent>
          </Card>
        ) : (
          <PublicCVUploader onUploaded={() => setIsSuccess(true)} />
        )}

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Perché caricare il tuo CV?</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Entra nel nostro database di talenti</li>
              <li>• Sii considerato per opportunità future</li>
              <li>• Processo di selezione semplificato</li>
              <li>• Aggiornamenti sulle nuove posizioni</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicCVUploadPage; 