'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authAPI } from '@/lib/auth-api'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')

      if (!token) {
        setStatus('error')
        setMessage('No verification token provided')
        return
      }

      try {
        const response = await authAPI.api.post('/api/v1/email/verify', {
          token,
        })

        setStatus('success')
        setMessage('Email verified successfully! Redirecting...')

        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (error: any) {
        setStatus('error')
        setMessage(error.response?.data?.detail || 'Email verification failed')
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Ascendra
          </h1>
          <p className="text-gray-400">Verifying your email</p>
        </div>

        {/* Status */}
        <div className="space-y-4">
          {status === 'loading' && (
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-gray-700 border-t-blue-400 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-400">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-2">
              <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                ✓ {message}
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                ✗ {message}
              </div>
              <button
                onClick={() => router.push('/register')}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Back to Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
