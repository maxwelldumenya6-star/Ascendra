'use client'

import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import ProtectedLayout from '@/components/ProtectedLayout'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <ProtectedLayout>
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="lg:col-span-3 p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-2">
                Welcome to Ascendra
              </h2>
              <p className="text-gray-400">
                Your business operating system is ready. Start building amazing things.
              </p>
            </div>

            {/* Profile Card */}
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Profile</h3>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="text-gray-500">Email:</span> {user?.email}
                </p>
                <p>
                  <span className="text-gray-500">Role:</span> {user?.role}
                </p>
                <p>
                  <span className="text-gray-500">Status:</span>{' '}
                  {user?.is_active ? (
                    <span className="text-green-400">Active</span>
                  ) : (
                    <span className="text-red-400">Inactive</span>
                  )}
                </p>
              </div>
            </div>

            {/* Email Verification Card */}
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Verification</h3>
              <div className="space-y-2">
                {user?.is_verified ? (
                  <p className="text-green-400 text-sm">✓ Email verified</p>
                ) : (
                  <p className="text-yellow-400 text-sm">Pending email verification</p>
                )}
              </div>
            </div>

            {/* Account Created Card */}
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>
                  Joined {new Date(user?.created_at || '').toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedLayout>
  )
}
