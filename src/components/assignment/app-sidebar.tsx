"use client"

import { type Assignment, type DayData } from "@/lib/services/assignment-service"

interface AppSidebarProps {
  daysData: DayData[]
  activeDay: number
  setActiveDay: (index: number) => void
}

export function AppSidebar({
  daysData,
  activeDay,
  setActiveDay,
  collapsed = false,
  onToggle,
  isMobile = false,
}: AppSidebarProps & {
  collapsed?: boolean
  onToggle?: () => void
  isMobile?: boolean
}) {
  const widthClass = collapsed ? "w-14" : "w-56"

  const Nav = (
    <nav className="flex flex-col gap-2">
      {daysData.map((d, idx) => {
        const isActive = idx === activeDay
        return (
          <button
            key={idx}
            onClick={() => setActiveDay(idx)}
            title={d.day}
            className={`text-left rounded-md ${collapsed ? "px-2" : "px-3"} py-2 text-sm font-semibold transition-colors border-2 cursor-pointer ${
              isActive
                ? "bg-white text-blue-900 border-white"
                : "bg-transparent hover:bg-blue-800/70 border-transparent"
            }`}
          >
            <span className={collapsed ? "sr-only" : ""}>{d.day}</span>
          </button>
        )
      })}
    </nav>
  )

  if (isMobile) {
    return (
      <aside
        className={`shrink-0 bg-blue-900 text-white pt-2 pb-6 px-2 md:px-3 fixed top-16 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-200 z-40`}
        style={{ left: collapsed ? -224 : 0, width: 224 }}
      >
        <div className="flex items-center justify-between mb-2">
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggle}
            className="rounded-md hover:bg-blue-800/60 p-1"
          >
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2V38M6 2H34C36.2091 2 38 3.79086 38 6V34C38 36.2091 36.2091 38 34 38H6C3.79086 38 2 36.2091 2 34V6C2 3.79086 3.79086 2 6 2Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        {Nav}
      </aside>
    )
  }

  return (
    <aside
      className={`shrink-0 bg-blue-900 text-white pt-2 pb-6 px-2 md:px-3 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-200`}
      style={{ width: collapsed ? 56 : 224 }}
    >
      <div className="flex items-center justify-between mb-2">
        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggle}
          className="rounded-md hover:bg-blue-800/60 p-1 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2V38M6 2H34C36.2091 2 38 3.79086 38 6V34C38 36.2091 36.2091 38 34 38H6C3.79086 38 2 36.2091 2 34V6C2 3.79086 3.79086 2 6 2Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      {Nav}
    </aside>
  )
}
