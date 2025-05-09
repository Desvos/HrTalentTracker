import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CVUploader from '@/components/dashboard/CVUploader';
import { apiRequest } from '@/lib/queryClient';
import { toast } from 'sonner';

interface CV {
  id: number;
  originalFileName: string;
  status: string;
  createdAt: string;
}

const CVUploadPage = () => {
  const [cvs, setCVs] = useState<CV[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest('GET', '/api/cv');
      setCVs(response.data);
    } catch (error) {
      console.error('Errore durante il recupero dei CV:', error);
      toast.error('Errore durante il recupero dei CV');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCVUploaded = async (cv: CV) => {
    setCVs(prev => [cv, ...prev]);
    toast.success('CV caricato con successo');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Gestione CV</h1>
      
      <div className="grid gap-8">
        <CVUploader onUploaded={handleCVUploaded} />
        
        <Card>
          <CardHeader>
            <CardTitle>I tuoi CV</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Caricamento...</p>
            ) : cvs.length === 0 ? (
              <p>Nessun CV caricato</p>
            ) : (
              <div className="space-y-4">
                {cvs.map(cv => (
                  <div
                    key={cv.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{cv.originalFileName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Caricato il {new Date(cv.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        cv.status === 'completed' ? 'bg-green-100 text-green-800' :
                        cv.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cv.status}
                      </span>
                      <button
                        onClick={() => navigate(`/cv/${cv.id}`)}
                        className="text-primary hover:underline"
                      >
                        Visualizza
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CVUploadPage; 