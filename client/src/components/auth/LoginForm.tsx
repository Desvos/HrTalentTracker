import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';
import { MapPin } from "lucide-react";

// Login form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  const validateForm = () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate using Zod schema
    const result = loginSchema.safeParse({ email, password });
    
    if (!result.success) {
      const formattedErrors = result.error.format();
      
      if (formattedErrors.email?._errors.length) {
        setEmailError(formattedErrors.email._errors[0]);
      }
      
      if (formattedErrors.password?._errors.length) {
        setPasswordError(formattedErrors.password._errors[0]);
      }
      
      return false;
    }
    
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to HR Talent Mapper!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <div className="flex justify-center items-center text-3xl font-bold text-primary mb-2">
              <MapPin className="mr-2" size={28} />
              <h1>HR Talent Mapper</h1>
            </div>
            <p className="text-muted-foreground">Sign in to access your account</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-xs text-destructive">{emailError}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
              </div>
              <a href="#" className="text-primary hover:text-primary/80">
                Forgot password?
              </a>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleLogin} 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <a 
              href="/signup" 
              className="text-primary hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                navigate('/signup');
              }}
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
