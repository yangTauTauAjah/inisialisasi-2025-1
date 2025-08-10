"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CardContent, CardHeader, Card } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { LogoIcon, User, Lock } from "./LogoIcon"
import Image from 'next/image'
import { message } from "antd"
import { useGlobalState } from "@/contexts/GlobalStateContext"

interface LoginFormProps {
  onSwitchToActivation: () => void
}

export function LoginForm({ onSwitchToActivation }: LoginFormProps) {
  const [nim, setNim] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'login-message';
  const { login } = useGlobalState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    messageApi.open({ key, type: 'loading', content: 'Logging you in, please wait...' })

    try {
      await login(nim, password)
      messageApi.open({ key, type: 'success', content: 'Login successful! Redirecting...', duration: 2 })
      setTimeout(() => {
        router.push("/assignment")
      }, 1200)
      
    } catch (error) {
      console.error('Login error:', error)
      messageApi.open({ key, type: 'error', content: error instanceof Error ? error.message : 'Login failed. Please try again.', duration: 2 })
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
        ></div>
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
            Login
          </h2>
          <p className="text-gray-400 text-sm mt-2">Login dengan menggunakan NIM dan Password yang telah diaktivasi</p>
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
                  placeholder="Masukkan Password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>

          <div className="text-center pt-2">
            <button 
              onClick={onSwitchToActivation} 
              className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors duration-200 cursor-pointer"
            >
              Aktivasi
            </button>
            <p className="text-gray-500 text-xs mt-2">Akun hanya bisa digunakan setelah diaktivasi</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
