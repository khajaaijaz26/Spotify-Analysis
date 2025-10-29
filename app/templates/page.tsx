import Link from 'next/link'
import { FiCode, FiFileText, FiLayers, FiMonitor, FiLayout } from 'react-icons/fi'

const templates = [
  {
    id: 'website',
    name: 'Website',
    description: 'Multi-page website with navigation and responsive design',
    icon: <FiMonitor className="h-8 w-8" />,
    color: 'blue',
    prompt: 'A professional business website'
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'High-converting single page with hero and CTA sections',
    icon: <FiFileText className="h-8 w-8" />,
    color: 'green',
    prompt: 'A modern SaaS landing page'
  },
  {
    id: 'react-app',
    name: 'React App',
    description: 'Interactive single-page application with state management',
    icon: <FiCode className="h-8 w-8" />,
    color: 'purple',
    prompt: 'A React todo app'
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    description: 'Dashboard with tables, stats, and data visualization',
    icon: <FiLayers className="h-8 w-8" />,
    color: 'red',
    prompt: 'An admin dashboard'
  },
  {
    id: 'presentation',
    name: 'Presentation',
    description: 'Slide deck for pitches and presentations',
    icon: <FiLayout className="h-8 w-8" />,
    color: 'yellow',
    prompt: 'A startup pitch presentation'
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200 hover:border-blue-400' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200 hover:border-green-400' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200 hover:border-purple-400' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200 hover:border-red-400' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200 hover:border-yellow-400' },
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose a Template
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with a pre-built template and customize it to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const colors = colorClasses[template.color]
            return (
              <Link
                key={template.id}
                href={`/create?template=${template.id}&prompt=${encodeURIComponent(template.prompt)}`}
                className={`bg-white rounded-xl border-2 ${colors.border} p-6 transition-all hover:shadow-lg group`}
              >
                <div className={`${colors.bg} ${colors.text} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {template.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>
                <div className={`${colors.text} font-medium text-sm flex items-center`}>
                  Use Template →
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/create"
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Start from Scratch
          </Link>
        </div>
      </div>
    </div>
  )
}
