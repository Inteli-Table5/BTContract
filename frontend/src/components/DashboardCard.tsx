import { Link } from "react-router-dom"
import { ReactNode } from "react"

interface DashboardCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
}

export function DashboardCard({ icon, title, description, href }: DashboardCardProps) {
  return (
    <Link to={href}>
      <div className="flex flex-col items-center p-6 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700/50 transition-colors cursor-pointer h-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500/10 text-yellow-500 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 text-center">{description}</p>
      </div>
    </Link>
  )
}