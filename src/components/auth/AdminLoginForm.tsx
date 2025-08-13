"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CardContent, CardHeader, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { message } from "antd"
import { useGlobalState } from "@/contexts/GlobalStateContext"
import { User, Lock } from "./LogoIcon"

export function AdminLoginForm() {
  const [nim, setNim] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'admin-login-message';
  const { adminLogin } = useGlobalState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    messageApi.open({ key, type: 'loading', content: 'Logging in as admin, please wait...' })

    try {
      await adminLogin(nim, password)
      messageApi.open({ key, type: 'success', content: 'Admin login successful! Redirecting...', duration: 2 })
      setTimeout(() => {
        router.push("/admin")
      }, 1200)
      
    } catch (error) {
      console.error('Admin login error:', error)
      messageApi.open({ key, type: 'error', content: error instanceof Error ? error.message : 'Admin login failed. Please try again.', duration: 2 })
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
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)',
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
      <Card className="w-full max-w-md bg-gray-900/95 border-purple-500/30 shadow-2xl backdrop-blur-xl relative z-10 px-4 py-6">
        <CardHeader className="text-center pb-6">
          <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <p className="text-gray-400 text-sm mt-2">Login sebagai administrator sistem</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nim" className="text-gray-300">
                Admin NIM
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200 h-4 w-4 z-10" />
                <Input
                  id="nim"
                  type="text"
                  placeholder="Masukkan NIM Admin"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="pl-8 pr-3 bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200 h-4 w-4 z-10" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan Password Admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-8 pr-3 bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Admin Login"}
            </Button>
          </form>

          
        </CardContent>
      </Card>
    </>
  )
}
