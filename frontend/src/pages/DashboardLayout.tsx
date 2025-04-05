import { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import { DashboardNav} from "../components/Navbar"

interface DashboardLayoutProps {
  children?: ReactNode // Torne `children` opcional
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <DashboardNav/>
      <div className="flex-1 p-6">
        {children}
        <Outlet /> {/* Renderiza as rotas aninhadas */}
      </div>
    </div>
  )
}