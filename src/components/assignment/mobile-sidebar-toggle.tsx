"use client"

interface MobileSidebarToggleProps {
  onToggle: () => void
}

export function MobileSidebarToggle({ onToggle }: MobileSidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="mb-4 p-2 hover:bg-gray-100 rounded-md transition-colors"
      aria-label="Show sidebar"
    >
      <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2V38M6 2H34C36.2091 2 38 3.79086 38 6V34C38 36.2091 36.2091 38 34 38H6C3.79086 38 2 36.2091 2 34V6C2 3.79086 3.79086 2 6 2Z" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
