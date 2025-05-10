import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import AppBar from "./AppBar";
import { MapPin } from "lucide-react";

interface PublicLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const PublicLayout = ({
  children,
  title = "TalentMatch.ai",
  description = "Visualizza e analizza la distribuzione geografica dei talenti per il tuo recruiting",
}: PublicLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <AppBar />

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold">TalentMatch.ai</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                The solution for visualizing and analyzing the geographic
                distribution of talent.
              </p>
            </div>
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="/features"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/pricing"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/changelog"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="/about"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="/contact"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/help"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Help
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; {new Date().getFullYear()} TalentMatch.ai. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
