import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { MapPin } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

// Signup form validation schema
const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    companyName: z.string().min(1, "Company name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Reset errors
    setFormErrors({});

    // Validate using Zod schema
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const formatted = result.error.format();
      const errors: Record<string, string> = {};

      if (formatted.fullName?._errors.length) {
        errors.fullName = formatted.fullName._errors[0];
      }

      if (formatted.companyName?._errors.length) {
        errors.companyName = formatted.companyName._errors[0];
      }

      if (formatted.email?._errors.length) {
        errors.email = formatted.email._errors[0];
      }

      if (formatted.password?._errors.length) {
        errors.password = formatted.password._errors[0];
      }

      if (formatted.confirmPassword?._errors.length) {
        errors.confirmPassword = formatted.confirmPassword._errors[0];
      }

      setFormErrors(errors);
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create a user object for the API
      const user = {
        username: formData.email.split("@")[0], // Generate username from email
        email: formData.email,
        fullName: formData.fullName,
        companyName: formData.companyName,
        password: formData.password,
      };

      const response = await apiRequest("POST", "/api/auth/signup", user);
      const data = await response.json();

      toast({
        title: "Account created",
        description:
          "Your account has been created successfully. Please log in.",
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Signup failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        variant: "destructive",
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
              <h1>Join TalentMatch.ai</h1>
            </div>
            <p className="text-muted-foreground">Create your account</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {formErrors.fullName && (
                <p className="text-xs text-destructive">
                  {formErrors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={handleChange}
              />
              {formErrors.companyName && (
                <p className="text-xs text-destructive">
                  {formErrors.companyName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <p className="text-xs text-destructive">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <p className="text-xs text-destructive">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {formErrors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              className="w-full"
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <a
              href="/login"
              className="text-primary hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
