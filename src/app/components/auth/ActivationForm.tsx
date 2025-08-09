"use client"

import type React from "react"
import { useState } from "react"
import { User, Lock } from "./LogoIcon"
import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import Image from 'next/image'
import { message } from "antd"

export function ActivationForm({ onSwitchToLogin, onActivationSuccess }: { onSwitchToLogin: () => void, onActivationSuccess: () => void }) {
  const [nim, setNim] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'activation-message';

  const resetForm = () => {
    setNim("")
    setPassword("")
    setConfirmPassword("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    messageApi.open({ key, type: 'loading', content: 'Mengaktivasi akun, mohon tunggu...' })
    setIsLoading(true)

    // Validate passwords match
    if (password !== confirmPassword) {
      messageApi.open({ key, type: 'error', content: 'Password dan konfirmasi password tidak cocok', duration: 3 })
      setIsLoading(false)
      return
    }

    // Validate password length
    if (password.length < 8) {
      messageApi.open({ key, type: 'error', content: 'Password harus minimal 8 karakter', duration: 3 })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nim, 
          password
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        messageApi.open({ 
          key, 
          type: 'error', 
          content: data.message || data.error || 'Aktivasi gagal. Silakan coba lagi.', 
          duration: 3 
        })
        return
      }

      // Activation successful
      messageApi.open({ 
        key, 
        type: 'success', 
        content: data.message || 'Aktivasi berhasil! Redirecting...', 
        duration: 2 
      })
      
      // Reset form after successful activation
      resetForm()
      
      setTimeout(() => {
        onActivationSuccess()
      }, 1500)
      
    } catch (error) {
      console.error('Activation error:', error)
      messageApi.open({ 
        key, 
        type: 'error', 
        content: 'Network error. Silakan cek koneksi dan coba lagi.', 
        duration: 3 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      {/* Logo with realistic glow */}
      <div className="relative z-20 mb-8">
        <div 
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
            width: '120px',
            height: '120px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >hello world</div>
        <Image
          src="/logo-inis.png"
          alt="Logo"
          width={75.33}
          height={71.46}
          priority
          className="relative z-10 drop-shadow-2xl"
        />
      </div>

      {/* Form card with enhanced styling */}
      <Card className="w-full max-w-md bg-gray-900/95 border-blue-500/30 shadow-2xl backdrop-blur-xl relative z-10 px-4 py-6">
        <CardHeader className="text-center pb-6">
          <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Aktivasi
          </h2>
          <p className="text-gray-400 text-sm mt-2">Aktivasi akunmu terlebih dahulu sebelum login</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nim" className="text-gray-300">
                NIM
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-4 w-4 z-10" />
                <Input
                  id="nim"
                  type="text"
                  placeholder="Masukkan NIM Anda"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="pl-8 pr-3 bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-4 w-4 z-10" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan Password Baru (min. 8 karakter)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-8 pr-3 bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Konfirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-4 w-4 z-10" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-8 pr-3 bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? "Mengaktivasi..." : "Aktivasi"}
            </Button>
          </form>

          <div className="text-center pt-2">
            <button 
              onClick={onSwitchToLogin} 
              className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}