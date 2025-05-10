import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Map, Users, BarChart, CheckCircle2, MapPin } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

const LandingPage = () => {
  const [_, navigate] = useLocation();

  return (
    <PublicLayout
      title="TalentMatch.ai - Visualize and analyze talent distribution"
      description="TalentMatch.ai is a tool for geographically visualizing candidate distribution and analyzing talent sources for your team."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find and analyze top talent with geographic mapping
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Visualize the geographic distribution of candidates and discover
                key talent sources with our advanced interactive map.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="lg" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-video bg-primary/10 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Map className="w-24 h-24 text-primary/50" />
                </div>
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                  12
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Map className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Geographic Visualization
              </h3>
              <p className="text-muted-foreground">
                Interactive map to visualize the geographic distribution of
                candidates in real time.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Talent Source Analysis</h3>
              <p className="text-muted-foreground">
                Automatically identify institutions and geographic areas that
                produce the best talent.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Filter and compare candidate data based on skills, roles, and
                academic background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose TalentMatch.ai
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0 mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-medium mb-1">
                  More Informed Hiring Decisions
                </h3>
                <p className="text-muted-foreground">
                  Understand where talent is located and identify new
                  recruitment areas to diversify your candidate pool.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0 mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-medium mb-1">
                  Recruitment Budget Optimization
                </h3>
                <p className="text-muted-foreground">
                  Focus recruitment efforts in high-potential areas based on
                  your specific needs.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0 mt-1 mr-4" />
              <div>
                <h3 className="text-xl font-medium mb-1">
                  Intuitive Interface
                </h3>
                <p className="text-muted-foreground">
                  No technical skills required. Clear and easy-to-use dashboards
                  for the entire HR team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform your recruitment process?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start visualizing and analyzing candidate data with TalentMatch.ai
            today.
          </p>
          <Button size="lg" onClick={() => navigate("/signup")}>
            Create a free account
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;
