'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FiCode, FiUser, FiLogOut } from 'react-icons/fi'

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FiCode className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AI Builder</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/templates" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Templates
              </Link>
              {session && (
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
              )}
              <Link href="/create" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Create
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
            ) : session ? (
              <>
                <Link 
                  href="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <FiUser className="h-5 w-5" />
                  <span className="hidden md:inline text-sm">{session.user?.name || session.user?.email}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
