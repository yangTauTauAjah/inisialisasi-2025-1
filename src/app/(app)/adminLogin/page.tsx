"use client";

import React from "react";
import { AdminLoginForm } from "@/app/components/auth/AdminLoginForm";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";

export default function AdminLogin() {

  return (
    <ProtectedRoute requireAuth={false} redirectTo="/assignment">
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at center, #0f0f23 0%, #0B0B0E 100%)",
        }}
      >
        {/* Realistic Rounded Lightbeam Effect with Curved Bottom */}
        <div className="absolute inset-0 z-0">
          {/* Main rounded spotlight - pointing downward, positioned above screen */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-20vh",
              width: "60vw",
              height: "70vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(12px)",
            }}
          ></div>

          {/* Curved bottom effect - shorter rounded shape for curve */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-15vh",
              width: "50vw",
              height: "60vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.06) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(15px)",
            }}
          ></div>

          {/* Inner core of the spotlight */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-15vh",
              width: "30vw",
              height: "60vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(10px)",
            }}
          ></div>

          {/* Brightest center core */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-10vh",
              width: "15vw",
              height: "50vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0.09) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(6px)",
            }}
          ></div>

          {/* Soft outer glow */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-30vh",
              width: "80vw",
              height: "80vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.04) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(25px)",
            }}
          ></div>

          {/* Secondary purple tint for depth */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-18vh",
              width: "55vw",
              height: "65vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(147, 51, 234, 0.06) 0%, rgba(147, 51, 234, 0.03) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(18px)",
            }}
          ></div>

          {/* Subtle cyan accent */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-12vh",
              width: "35vw",
              height: "55vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0.04) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(14px)",
            }}
          ></div>

          {/* Additional blur layers for 3D effect */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-40vh",
              width: "90vw",
              height: "90vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.02) 0%, rgba(59, 130, 246, 0.01) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(35px)",
            }}
          ></div>

          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-25vh",
              width: "70vw",
              height: "75vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.06) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(22px)",
            }}
          ></div>

          {/* Extra atmospheric blur layer */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-35vh",
              width: "100vw",
              height: "95vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.01) 0%, rgba(59, 130, 246, 0.005) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(40px)",
            }}
          ></div>

          {/* Form highlighting effect - curved bottom */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-5vh",
              width: "45vw",
              height: "45vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.10) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(20px)",
            }}
          ></div>

          {/* Additional curved bottom layers for smooth curve */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-8vh",
              width: "40vw",
              height: "48vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(18px)",
            }}
          ></div>

          <div
            className="absolute left-1/2 transform -translate-x-1/2"
            style={{
              top: "-12vh",
              width: "35vw",
              height: "52vh",
              background:
                "radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.09) 0%, rgba(59, 130, 246, 0.045) 50%, transparent 100%)",
              borderRadius: "0 0 30% 30%",
              filter: "blur(16px)",
            }}
          ></div>

          {/* Radial falloff for realistic lighting */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#0B0B0E]"></div>

          {/* Subtle atmospheric particles */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-blue-400/30 rounded-full"
                style={{
                  left: `${15 + i * 10}%`,
                  top: `${5 + i * 6}%`,
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <AdminLoginForm />
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) scale(1);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-10px) scale(1.2);
              opacity: 0.6;
            }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}
