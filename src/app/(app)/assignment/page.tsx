"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/assignment/header"
import { AppSidebar } from "@/app/components/assignment/app-sidebar"
import { AssignmentContent } from "@/app/components/assignment/assignment-content"
import { MobileMenuDropdown } from "@/app/components/assignment/mobile-menu-dropdown"
import { useMobileDetection } from "@/app/lib/hooks/use-mobile-detection"
import { assignmentService, type Assignment, type DayData } from "@/app/lib/services/assignment-service"

export default function AssignmentPage() {
  const [activeDay, setActiveDay] = useState(0)
  const [selectedTask, setSelectedTask] = useState<Assignment | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [daysData, setDaysData] = useState<DayData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const { isMobile, collapsed, setCollapsed } = useMobileDetection()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError("")
        
        const [assignmentGroups, assignments] = await Promise.all([
          assignmentService.fetchAssignmentGroups(),
          assignmentService.fetchAssignments()
        ])
        
        const transformedData = assignmentService.transformToDayData(assignmentGroups, assignments)
        setDaysData(transformedData)
      } catch (err) {
        console.error('Error fetching assignment data:', err)
        setError("Gagal memuat data tugas. Silakan coba lagi.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTaskClick = (task: Assignment) => {
    setSelectedTask(task)
  }

  const handleBackToList = () => {
    setSelectedTask(null)
  }

  const handleDayChange = (dayIndex: number) => {
    setActiveDay(dayIndex)
    setSelectedTask(null) // Clear selected task when changing days
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <div className="flex-1 flex items-center justify-center mt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data tugas...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <div className="flex-1 flex items-center justify-center mt-16">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (daysData.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <div className="flex-1 flex items-center justify-center mt-16">
          <div className="text-center">
            <p className="text-gray-600">Tidak ada tugas yang tersedia saat ini.</p>
          </div>
        </div>
      </div>
    )
  }

  const currentDayData = daysData[activeDay]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      
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
          <AssignmentContent
            dayTitle={currentDayData.day}
            tasks={currentDayData.tasks}
            selectedTask={selectedTask}
            isMobile={isMobile}
            sidebarCollapsed={collapsed}
            onTaskClick={handleTaskClick}
            onBackToList={handleBackToList}
            onSidebarToggle={() => setCollapsed(false)}
          />
        </main>
      </div>

      <MobileMenuDropdown 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </div>
  )
}