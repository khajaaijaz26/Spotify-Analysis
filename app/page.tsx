import Link from "next/link";
import { FiCode, FiZap, FiDownload, FiLayers, FiCheck } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Anything with
            <span className="text-blue-600"> AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create apps, websites, landing pages, and presentations using simple text prompts.
            Your ideas, powered by AI, deployed in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <FiZap className="mr-2" />
              Start Building
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors border-2 border-gray-200"
            >
              <FiLayers className="mr-2" />
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Build Fast
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiCode className="h-8 w-8 text-blue-600" />}
              title="AI Code Generator"
              description="Describe your project in plain text and watch AI generate complete, production-ready code"
            />
            <FeatureCard
              icon={<FiZap className="h-8 w-8 text-blue-600" />}
              title="Live Preview"
              description="See your project come to life in real-time with our interactive preview and editor"
            />
            <FeatureCard
              icon={<FiDownload className="h-8 w-8 text-blue-600" />}
              title="One-Click Deploy"
              description="Export as ZIP or publish directly to Vercel with a single click"
            />
          </div>
        </div>
      </section>

      {/* What You Can Build Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            What Can You Build?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            From simple landing pages to complex admin panels - build anything
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectTypeCard
              title="Websites"
              description="Full-featured websites with multiple pages, navigation, and responsive design"
            />
            <ProjectTypeCard
              title="Landing Pages"
              description="High-converting landing pages with modern designs and CTAs"
            />
            <ProjectTypeCard
              title="React Apps"
              description="Interactive single-page applications with state management"
            />
            <ProjectTypeCard
              title="Admin Panels"
              description="Complete dashboards with tables, charts, and data management"
            />
            <ProjectTypeCard
              title="Presentations"
              description="Modern slide decks and pitch presentations"
            />
            <ProjectTypeCard
              title="Custom Projects"
              description="Anything else you can imagine - just describe it!"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators building with AI
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ProjectTypeCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
      <div className="flex items-start mb-3">
        <FiCheck className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

