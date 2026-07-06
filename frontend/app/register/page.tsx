'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth-store'

export default function RegisterPage() {
  const router = useRouter()
  const { register, error, isLoading, clearError } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
  })
  const [localError, setLocalError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError('')
    clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    // Validation
    if (!formData.email || !formData.password || !formData.passwordConfirm) {
      setLocalError('Please fill in required fields')
      return
    }

    if (formData.password.length < 8) {
      setLocalError('Password must be at least 8 characters')
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      setLocalError('Passwords do not match')
      return
    }

    try {
      await register(
        formData.email,
        formData.password,
        formData.passwordConfirm,
        formData.firstName,
        formData.lastName
      )
      router.push('/dashboard')
    } catch (err) {
      setLocalError(error || 'Registration failed')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Ascendra
          </h1>
          <p className="text-gray-400">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              disabled={isLoading}
            />
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              disabled={isLoading}
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              disabled={isLoading}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password * (min 8 characters)
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              disabled={isLoading}
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-300">
              Confirm Password *
            </label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {(localError || error) && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {localError || error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
