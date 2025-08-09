"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/assignment/header"
import { TaskCard } from "@/app/components/assignment/task-card"
import { TaskDetail } from "@/app/components/assignment/task-detail"
import { AppSidebar } from "@/app/components/assignment/app-sidebar"

interface Task {
  id: number
  title: string
  deadline: string
  description?: string
}

interface DayData {
  day: string
  tasks: Task[]
}

const daysData: DayData[] = [
  {
    day: "Inisialisasi Day 1",
    tasks: [
      {
        id: 1,
        title: "TUGAS 1",
        deadline: "Selasa, 20 Oktober 2025. Pukul 23.59 WIB",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      },
      {
        id: 2,
        title: "TUGAS 2",
        deadline: "Rabu, 21 Oktober 2025. Pukul 23.59 WIB",
      },
    ],
  },
  {
    day: "Inisialisasi Day 2",
    tasks: [
      {
        id: 3,
        title: "TUGAS 3",
        deadline: "Kamis, 22 Oktober 2025. Pukul 23.59 WIB",
      },
    ],
  },
  {
    day: "Inisialisasi Day 3",
    tasks: [],
  },
  {
    day: "Inisialisasi Day 4",
    tasks: [
      {
        id: 4,
        title: "TUGAS 4",
        deadline: "Minggu, 25 Oktober 2025. Pukul 23.59 WIB",
      },
      {
        id: 5,
        title: "TUGAS 5",
        deadline: "Senin, 26 Oktober 2025. Pukul 23.59 WIB",
      },
    ],
  },
]

export default function AssignmentPage() {
  const [activeDay, setActiveDay] = useState(0)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
  }

  const handleBackToList = () => {
    setSelectedTask(null)
  }

  const handleDayChange = (dayIndex: number) => {
    setActiveDay(dayIndex)
    setSelectedTask(null) // Clear selected task when changing days
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header is now fixed and full width */}
      <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      {/* This div contains the sidebar and the main content, pushed down by the header's height */}
      <div className="flex flex-1">
        <AppSidebar
          daysData={daysData}
          activeDay={activeDay}
          setActiveDay={handleDayChange}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          isMobile={isMobile}
        />
        <main className="flex-1 p-4 md:p-6 mt-16 w-full">
          <div className="w-full">
            {/* Mobile sidebar toggle button */}
            {isMobile && collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="mb-4 p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Show sidebar"
              >
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2V38M6 2H34C36.2091 2 38 3.79086 38 6V34C38 36.2091 36.2091 38 34 38H6C3.79086 38 2 36.2091 2 34V6C2 3.79086 3.79086 2 6 2Z" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            
            <h2 className="text-2xl font-bold text-blue-900 mb-4">{daysData[activeDay].day}</h2>
            {selectedTask ? (
              <TaskDetail task={selectedTask} onBack={handleBackToList} />
            ) : (
              <>
                {daysData[activeDay].tasks.length > 0 ? (
                  <div className="space-y-4">
                    {daysData[activeDay].tasks.map((task) => (
                      <TaskCard key={task.id} task={task} onClick={() => handleTaskClick(task)} />
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-blue-900 rounded-xl p-8 text-center text-blue-900/70">
                    Belum ada tugas untuk hari ini
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
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
      )}
    </div>
  )
}