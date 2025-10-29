'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Editor from '@monaco-editor/react'
import { FiPlay, FiDownload, FiSave } from 'react-icons/fi'

type FileMap = Record<string, string>

export default function CreatePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [projectType, setProjectType] = useState('website')
  const [projectName, setProjectName] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [files, setFiles] = useState<FileMap>({})
  const [selectedFile, setSelectedFile] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  if (status === 'loading') {
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

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type: projectType }),
      })

      const data = await response.json()

      if (data.success) {
        setFiles(data.code)
        const firstFile = Object.keys(data.code)[0]
        setSelectedFile(firstFile)
        if (!projectName) {
          setProjectName(prompt.slice(0, 50))
        }
      } else {
        alert('Failed to generate code: ' + data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate code')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (value: string | undefined) => {
    if (value !== undefined && selectedFile) {
      setFiles({ ...files, [selectedFile]: value })
    }
  }

  const handleSave = async () => {
    if (!projectName.trim()) {
      alert('Please enter a project name')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          description: prompt,
          type: projectType,
          code: files,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert('Project saved successfully!')
      } else {
        alert('Failed to save project: ' + data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadZip = async () => {
    setDownloading(true)
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files,
          projectName: projectName || 'project',
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Convert base64 to blob and download
        const byteCharacters = atob(data.zip)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: 'application/zip' })
        
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = data.filename
        a.click()
        URL.revokeObjectURL(url)
      } else {
        alert('Failed to create zip: ' + data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to download project')
    } finally {
      setDownloading(false)
    }
  }

  const getLanguage = (filename: string) => {
    if (filename.endsWith('.html')) return 'html'
    if (filename.endsWith('.css')) return 'css'
    if (filename.endsWith('.js')) return 'javascript'
    if (filename.endsWith('.jsx')) return 'javascript'
    if (filename.endsWith('.ts')) return 'typescript'
    if (filename.endsWith('.tsx')) return 'typescript'
    return 'plaintext'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Prompt Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your Project</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="My Awesome Project"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to build?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your project... (e.g., 'A modern portfolio website for a photographer')"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="website">Website</option>
                <option value="landing-page">Landing Page</option>
                <option value="react-app">React App</option>
                <option value="admin-panel">Admin Panel</option>
                <option value="presentation">Presentation</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FiPlay className="mr-2" />
                  Generate Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor Section */}
        {Object.keys(files).length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-2 overflow-x-auto">
                {Object.keys(files).map((filename) => (
                  <button
                    key={filename}
                    onClick={() => setSelectedFile(filename)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                      selectedFile === filename
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filename}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <FiPlay className="mr-1" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center disabled:bg-gray-400"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-1" />
                      Save
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadZip}
                  disabled={downloading}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center disabled:bg-gray-400"
                >
                  {downloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiDownload className="mr-1" />
                      Download ZIP
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-0`}>
              <div className={showPreview ? 'border-r border-gray-200' : ''}>
                <Editor
                  height="600px"
                  language={getLanguage(selectedFile)}
                  value={files[selectedFile] || ''}
                  onChange={handleFileChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
              
              {showPreview && (
                <div className="bg-white">
                  <div className="h-[600px] overflow-auto">
                    <iframe
                      srcDoc={files['index.html'] || '<p>No preview available</p>'}
                      title="Preview"
                      className="w-full h-full border-0"
                      sandbox="allow-scripts"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
