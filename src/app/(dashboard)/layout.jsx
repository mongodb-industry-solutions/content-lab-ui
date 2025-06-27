"use client";

import Sidebar from "@/components/Sidebar"
export default function DashboardLayout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-13 min-h-screen">
      <div className="lg:col-span-2">
        <Sidebar />
      </div>
      <main className="lg:col-span-11 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}