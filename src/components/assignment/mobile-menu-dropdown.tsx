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
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Menu container */}
      <div className="relative bg-blue-900 shadow-xl min-w-48">
        <nav className="flex flex-col py-3">
          <Link
            href="/"
            className="flex items-center px-4 py-3 hover:bg-blue-800 transition-colors duration-200 text-sm font-medium text-white"
            onClick={onClose}
          >
            HOME
          </Link>
          <Link
            href="/#guidelines"
            className="flex items-center px-4 py-3 hover:bg-blue-800 transition-colors duration-200 text-sm font-medium text-white"
            onClick={onClose}
          >
            TATA TERTIB
          </Link>
          <Link
            href="/announcement"
            className="flex items-center px-4 py-3 hover:bg-blue-800 transition-colors duration-200 text-sm font-medium text-white"
            onClick={onClose}
          >
            BERITA & PENGUMUMAN
          </Link>
          <Link
            href="/penugasan"
            className="flex items-center px-4 py-3 hover:bg-blue-800 transition-colors duration-200 text-sm font-medium text-white"
            onClick={onClose}
          >
            PENUGASAN
          </Link>
          
          <div className="mt-2 pt-2 px-3">
            {state.isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-white text-blue-900 rounded-full hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
              >
                LOG OUT
              </button>
            ) : (
              <button 
                onClick={handleLogin}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-white text-blue-900 rounded-full hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
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
