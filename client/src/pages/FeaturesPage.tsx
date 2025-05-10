import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Map,
  BarChart2,
  FileText,
  Layers,
  Filter,
  Zap,
  Users,
  Lock,
  ArrowRight,
} from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

const FeaturesPage = () => {
  const [_, navigate] = useLocation();

  return (
    <PublicLayout
      title="Features - TalentMatch.ai"
      description="Discover all TalentMatch.ai features: from geographic visualization to talent source analysis."
    >
      {/* Hero Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Discover the powerful features of TalentMatch.ai
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            Our platform offers advanced visualization and analysis tools to
            help you make informed recruiting decisions.
          </p>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-16">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
                  Visualization
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Interactive geographic map
                </h2>
                <p className="text-gray-600 mb-6">
                  View the geographic distribution of candidates in real-time.
                  Our interactive map allows you to:
                </p>
                <ul className="space-y-3">
                  {[
                    "View talent concentration by geographic areas",
                    'Identify talent "hotspots" at a glance',
                    "Filter by skills, roles, and education",
                    "Zoom and pan for detailed analysis",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 bg-gray-50 rounded-lg p-8">
                <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg shadow-sm overflow-hidden flex items-center justify-center">
                  <Map className="w-24 h-24 text-primary/30" />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg shadow-sm overflow-hidden flex items-center justify-center">
                  <BarChart2 className="w-24 h-24 text-primary/30" />
                </div>
              </div>
              <div>
                <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
                  Analytics
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Advanced analytics dashboards
                </h2>
                <p className="text-gray-600 mb-6">
                  Get powerful insights with our analytics dashboards that allow
                  you to:
                </p>
                <ul className="space-y-3">
                  {[
                    "Analyze skill distribution by role and region",
                    "Identify institutions that train candidates with specific skills",
                    "Compare different geographic areas for talent density",
                    "Monitor trends and variations over time",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
                  Filters
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Powerful search filters
                </h2>
                <p className="text-gray-600 mb-6">
                  Find exactly what you're looking for with our advanced
                  filters:
                </p>
                <ul className="space-y-3">
                  {[
                    "Filter by role, specific skill, or skill combinations",
                    "Search by educational institution or academic background",
                    "Filter by geographic area and relocation availability",
                    "Combine filters for highly specific searches",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 bg-gray-50 rounded-lg p-8">
                <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg shadow-sm overflow-hidden flex items-center justify-center">
                  <Filter className="w-24 h-24 text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Other features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="h-6 w-6" />,
                title: "Data export",
                description:
                  "Easily export your data in different formats (CSV, Excel) for further analysis or reporting.",
              },
              {
                icon: <Layers className="h-6 w-6" />,
                title: "Talent source analysis",
                description:
                  "Identify institutions and geographic areas that produce candidates with the skills you're looking for.",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "API integration",
                description:
                  "Integrate TalentMatch.ai with your existing HR tools through our RESTful APIs.",
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Team management",
                description:
                  "Collaborate with your team by assigning roles and permissions for controlled platform access.",
              },
              {
                icon: <Lock className="h-6 w-6" />,
                title: "Advanced security",
                description:
                  "Your data is protected with advanced encryption and industry-standard security measures.",
              },
              {
                icon: <BarChart2 className="h-6 w-6" />,
                title: "Custom reports",
                description:
                  "Create custom and scheduled reports to share key insights with stakeholders.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Integrates with your favorite tools
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-3xl mx-auto">
            TalentMatch.ai seamlessly integrates with the leading ATS and HR
            tools on the market.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              "Workday",
              "SAP SuccessFactors",
              "Oracle HCM",
              "Greenhouse",
              "Lever",
              "Taleo",
              "BambooHR",
              "Recruitee",
            ].map((tool, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg px-6 py-4 text-gray-700 font-medium"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Ready to transform your talent acquisition process?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Discover how TalentMatch.ai can help you find the best talent
            worldwide.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="group"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default FeaturesPage;
