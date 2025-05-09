import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { apiRequest } from '@/lib/queryClient';
import { toast } from 'sonner';

const CVUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Verifica il tipo di file
    if (!file.type.includes('pdf') && !file.type.includes('image')) {
      toast.error('Solo file PDF e immagini sono supportati');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('cv', file);

      const response = await apiRequest('POST', '/api/cv/upload', {
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      toast.success('CV caricato con successo');
      // Qui puoi aggiungere la logica per gestire la risposta
      // ad esempio, reindirizzare alla pagina di visualizzazione del CV
    } catch (error) {
      console.error('Errore durante il caricamento:', error);
      toast.error('Errore durante il caricamento del CV');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Carica il tuo CV</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="space-y-4">
              <p>Caricamento in corso...</p>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          ) : isDragActive ? (
            <p>Rilascia il file qui...</p>
          ) : (
            <div className="space-y-2">
              <p>Trascina e rilascia il tuo CV qui, o clicca per selezionare</p>
              <p className="text-sm text-muted-foreground">
                Supporta file PDF e immagini (PNG, JPG)
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CVUploader; 