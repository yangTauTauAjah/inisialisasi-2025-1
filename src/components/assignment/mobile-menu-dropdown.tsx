"use client";

import { useGlobalState } from "@/contexts/GlobalStateContext";
import Link from "antd/es/typography/Link";

interface MobileMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDropdown({
  isOpen,
  onClose,
}: MobileMenuDropdownProps) {
  const { state } = useGlobalState();
  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-0 z-50 lg:hidden">
      <div className="bg-blue-900 text-white shadow-lg rounded-b-lg border border-blue-800 min-w-48">
        <nav className="py-2">
          <Link
            href="/"
            className="block px-4 py-2 hover:bg-blue-800 transition-colors"
          >
            HOME
          </Link>
          <Link
            href="/tata-tertib"
            className="block px-4 py-2 hover:bg-blue-800 transition-colors"
          >
            TATA TERTIB
          </Link>
          <Link
            href="/berita"
            className="block px-4 py-2 hover:bg-blue-800 transition-colors"
          >
            BERITA & PENGUMUMAN
          </Link>
          <Link
            href="/penugasan"
            className="block px-4 py-2 hover:bg-blue-800 transition-colors"
          >
            PENUGASAN
          </Link>
          <div className="border-t border-blue-800 mt-2 pt-2">
            {state.nim ? (
              <button className="w-full text-left px-4 py-2 bg-white text-blue-900 rounded mx-2 hover:bg-gray-100 transition-colors">
                LOG OUT
              </button>
            ) : (
              <button className="w-full text-left px-4 py-2 bg-white text-blue-900 rounded mx-2 hover:bg-gray-100 transition-colors">
                LOG IN
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
