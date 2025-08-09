"use client"

interface MobileMenuDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenuDropdown({ isOpen, onClose }: MobileMenuDropdownProps) {
  if (!isOpen) return null

  return (
    <div className="fixed top-16 right-0 z-50 lg:hidden">
      <div className="bg-blue-900 text-white shadow-lg rounded-b-lg border border-blue-800 min-w-48">
        <nav className="py-2">
          <a href="/" className="block px-4 py-2 hover:bg-blue-800 transition-colors">HOME</a>
          <a href="/tata-tertib" className="block px-4 py-2 hover:bg-blue-800 transition-colors">TATA TERTIB</a>
          <a href="/berita" className="block px-4 py-2 hover:bg-blue-800 transition-colors">BERITA & PENGUMUMAN</a>
          <a href="/penugasan" className="block px-4 py-2 hover:bg-blue-800 transition-colors">PENUGASAN</a>
          <div className="border-t border-blue-800 mt-2 pt-2">
            <button className="w-full text-left px-4 py-2 bg-white text-blue-900 rounded mx-2 hover:bg-gray-100 transition-colors">
              LOG OUT
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}
