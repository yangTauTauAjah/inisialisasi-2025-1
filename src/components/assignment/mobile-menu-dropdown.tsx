"use client";

import { useGlobalState } from "@/contexts/GlobalStateContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MobileMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDropdown({
  isOpen,
  onClose,
}: MobileMenuDropdownProps) {
  const { state, logout } = useGlobalState();
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
      router.push("/");
      onClose();
    }
  };

  const handleLogin = () => {
    router.push("/auth");
    onClose();
  };

  return (
    <div className="fixed top-16 right-0 z-50 lg:hidden">
      {/* Localized backdrop overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl" onClick={onClose}></div>
      
      {/* Menu container */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl min-w-52 overflow-hidden">
        {/* Subtle top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-50"></div>
        
        <nav className="flex flex-col py-2">
          <Link
            href="/"
            className="flex items-center px-5 py-3.5 hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-300 text-sm font-medium text-white/90 hover:text-white group"
            onClick={onClose}
          >
            <div className="w-1 h-1 bg-blue-300 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            HOME
          </Link>
          <Link
            href="/#guidelines"
            className="flex items-center px-5 py-3.5 hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-300 text-sm font-medium text-white/90 hover:text-white group"
            onClick={onClose}
          >
            <div className="w-1 h-1 bg-blue-300 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            TATA TERTIB
          </Link>
          <Link
            href="/announcement"
            className="flex items-center px-5 py-3.5 hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-300 text-sm font-medium text-white/90 hover:text-white group"
            onClick={onClose}
          >
            <div className="w-1 h-1 bg-blue-300 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            BERITA & PENGUMUMAN
          </Link>
          <Link
            href="/penugasan"
            className="flex items-center px-5 py-3.5 hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-300 text-sm font-medium text-white/90 hover:text-white group"
            onClick={onClose}
          >
            <div className="w-1 h-1 bg-blue-300 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            PENUGASAN
          </Link>
          
          <div className="mt-3 pt-3 px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3"></div>
            {state.isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-5 py-3 bg-white/95 backdrop-blur-sm text-blue-900 rounded-xl hover:bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-sm font-semibold shadow-md"
              >
                LOG OUT
              </button>
            ) : (
              <button 
                onClick={handleLogin}
                className="w-full flex items-center justify-center px-5 py-3 bg-white/95 backdrop-blur-sm text-blue-900 rounded-xl hover:bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-sm font-semibold shadow-md"
              >
                LOG IN
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
