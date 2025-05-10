import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Users, Globe, Award, Lightbulb } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

const AboutPage = () => {
  const [_, navigate] = useLocation();

  return (
    <PublicLayout
      title="About Us - TalentMatch.ai"
      description="Discover our mission: helping companies find and visualize the best talent worldwide."
    >
      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Our Mission
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            We want to revolutionize how companies discover and analyze talent
            through geographic visualization and advanced analytics.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  TalentMatch.ai was born in 2022 from a simple but powerful
                  idea: companies should be able to see at a glance where talent
                  is located around the world.
                </p>
                <p>
                  Our founders, with decades of experience in HR and technology
                  sectors, recognized that companies were spending too much time
                  trying to figure out where to focus their recruiting efforts.
                </p>
                <p>
                  We built our platform from scratch, focusing on ease of use
                  and analytical power, to provide HR professionals with a
                  solution that transforms raw data into strategic insights.
                </p>
                <p>
                  Today, we serve hundreds of companies worldwide, helping them
                  discover talent in ways that weren't possible before.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="aspect-w-4 aspect-h-3 bg-primary/10 rounded-lg overflow-hidden flex items-center justify-center">
                <Globe className="w-32 h-32 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly push the boundaries of what's possible with data
                and visualizations, always seeking new ways to help our
                customers.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We believe the best solutions come from collaboration with our
                customers, partners, and within our teams.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the quality
                of our product to the support we provide to our customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marco Rossi",
                role: "CEO & Co-founder",
                bio: "Former Director of Talent Acquisition at Fortune 500 companies, Marco has a passion for innovation in the HR sector.",
              },
              {
                name: "Laura Bianchi",
                role: "CTO & Co-founder",
                bio: "With a background in data visualization and machine learning, Laura leads the development of our technological platform.",
              },
              {
                name: "Giovanni Verdi",
                role: "Head of Customer Success",
                bio: "Giovanni ensures that every customer gets maximum value from our platform, with over 10 years of experience in consulting roles.",
              },
            ].map((person, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary text-2xl font-bold">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{person.name}</h3>
                  <p className="text-primary font-medium mb-4">{person.role}</p>
                  <p className="text-gray-600">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Join us in our mission
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Discover how TalentMatch.ai can transform your talent acquisition
            process.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default AboutPage;
