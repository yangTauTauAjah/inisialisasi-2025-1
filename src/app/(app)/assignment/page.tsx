import React from "react";
import {
  Assignment,
  AssignmentGroup,
} from "@/app/(app)/lib/mockData";
import { SubmissionPage } from "./Component";
import { createClient } from "../lib/supabase/server";

const supabase = await createClient();

const AssignmentGroups = await supabase
  .from("task-group")
  .select<"*", AssignmentGroup>("*")
  .then((res) => res.data?.filter(e => e.is_active) || []);

const Assignments = await supabase
  .from("sub-tasks")
  .select<"*", Assignment>("*")
  .then((res) => res.data?.filter(assignment => AssignmentGroups.some(group => group.id === assignment.task_group_id)) || []);

const Page = () => {
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