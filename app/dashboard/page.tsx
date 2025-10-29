'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiPlus, FiFolder, FiClock, FiExternalLink } from 'react-icons/fi'

interface Project {
  id: string
  name: string
  description: string | null
  type: string
  updatedAt: string
  createdAt: string
  deployUrl?: string | null
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchProjects()
    }
  }, [session])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      if (data.projects) {
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">
            Manage your projects and create new ones
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {projects.length}
                </p>
              </div>
              <FiFolder className="h-10 w-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {projects.filter(p => {
                    const date = new Date(p.createdAt)
                    const now = new Date()
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                  }).length}
                </p>
              </div>
              <FiClock className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Deployed</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {projects.filter(p => p.deployUrl).length}
                </p>
              </div>
              <FiExternalLink className="h-10 w-10 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Link
            href="/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            Create New Project
          </Link>
        </div>

        {/* Projects Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Projects
          </h2>
          
          {projects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <FiFolder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by creating your first project
              </p>
              <Link
                href="/create"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <FiPlus className="mr-2" />
                Create Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <FiFolder className="h-16 w-16 text-blue-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 capitalize">
                      {project.type.replace('-', ' ')}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Updated {formatDate(project.updatedAt)}
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href={`/create?project=${project.id}`}
                        className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
