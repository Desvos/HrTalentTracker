import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { apiRequest } from '@/lib/queryClient';
import { toast } from 'sonner';
import PublicLayout from '@/components/layout/PublicLayout';

const PublicCVUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Please enter your first and last name');
      return;
    }

    // Verifica il tipo di file
    if (!file.type.includes('pdf') && !file.type.includes('image')) {
      toast.error('Only PDF and image files are supported');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('cv', file);
      formData.append('firstName', firstName.trim());
      formData.append('lastName', lastName.trim());

      const response = await apiRequest('POST', '/api/public/cv/upload', {
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: { loaded: number; total?: number }) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      toast.success('CV uploaded successfully');
      setFirstName('');
      setLastName('');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error during upload:', error);
      toast.error('Error uploading CV');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [firstName, lastName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  if (isSuccess) {
    return (
      <PublicLayout
        title="Upload CV - HR Talent Mapper"
        description="Upload your CV to join our talent database"
      >
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">Thank you for uploading your CV!</h2>
            <p>
              We have received your CV and will review it shortly.
              We will contact you if your profile matches our requirements.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-primary hover:underline"
            >
              Upload another CV
            </button>
          </CardContent>
        </Card>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout
      title="Upload CV - HR Talent Mapper"
      description="Upload your CV to join our talent database"
    >
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Upload your CV</h1>
            <p className="text-muted-foreground">
              Fill out the form below to upload your CV. Our recruiters will review it as soon as possible.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upload your CV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isUploading}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isUploading}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'}
                  ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}`}
              >
                <input {...getInputProps()} />
                {isUploading ? (
                  <div className="space-y-4">
                    <p>Uploading...</p>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                ) : isDragActive ? (
                  <p>Drop the file here...</p>
                ) : (
                  <div className="space-y-2">
                    <p>Drag and drop your CV here, or click to select</p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF and image files (PNG, JPG)
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Why upload your CV?</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Join our talent database</li>
                <li>• Be considered for future opportunities</li>
                <li>• Simplified selection process</li>
                <li>• Updates on new positions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PublicCVUploader; 