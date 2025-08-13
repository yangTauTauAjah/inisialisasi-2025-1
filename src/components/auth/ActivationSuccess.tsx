"use client"

import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { CheckCircle } from "lucide-react"
import Image from 'next/image'

interface ActivationSuccessProps {
  onSwitchToLogin: () => void
}

export function ActivationSuccess({ onSwitchToLogin }: ActivationSuccessProps) {
  return (
    <>
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
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AKTIVASI AKUN
          </h2>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.1) 50%, transparent 100%)',
                  width: '80px',
                  height: '80px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>
              <CheckCircle className="w-16 h-16 text-green-500 relative z-10 drop-shadow-lg" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Aktivasi akun berhasil</h3>
            <p className="text-gray-400 text-sm">
              Akun Anda telah berhasil diaktivasi. Silakan login untuk melanjutkan.
            </p>
          </div>

          <Button
            onClick={onSwitchToLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Login Sekarang
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
