import { useGlobalState } from "@/contexts/GlobalStateContext";
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

interface HeaderProps {
  onMobileMenuToggle?: () => void
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const { state, logout } = useGlobalState();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    window.location.href = href;
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to home
      window.location.href = "/";
    }
  };

  const handleLogin = () => {
    window.location.href = "/auth";
  };

  return (
    <header className="bg-blue-900 text-white px-6 py-4 fixed top-0 left-0 right-0 z-50 w-full shadow-md h-16">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide">INISIALISASI 2025</h1>
        <nav className="hidden lg:flex items-center space-x-6">
          <button 
            onClick={() => handleNavigation("/")} 
            className="hover:text-blue-200 transition-colors"
          >
            HOME
          </button>
          <button 
            onClick={() => handleNavigation("/#guidelines")} 
            className="hover:text-blue-200 transition-colors"
          >
            TATA TERTIB
          </button>
          <button 
            onClick={() => handleNavigation("/announcement")} 
            className="hover:text-blue-200 transition-colors"
          >
            BERITA & PENGUMUMAN
          </button>
          <button 
            onClick={() => handleNavigation("/penugasan")} 
            className="hover:text-blue-200 transition-colors"
          >
            PENUGASAN
          </button>
          {state.isAuthenticated ? 
            <Button 
              variant="outline" 
              size="sm" 
              className="text-blue-900 bg-white hover:bg-gray-100 rounded-full px-4"
              onClick={handleLogout}
            >
              LOG OUT
            </Button> : 
            <Button 
              variant="outline" 
              size="sm" 
              className="text-blue-900 bg-white hover:bg-gray-100 rounded-full px-4"
              onClick={handleLogin}
            >
              LOG IN
            </Button>
          }
        </nav>
        <button 
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-md hover:bg-blue-800"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </header>
  )
}
