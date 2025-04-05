import { Link, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Bitcoin, Code, FileText, LayoutDashboard, LogOut, Settings, Upload, User } from 'lucide-react'
import { useState } from 'react'

export function DashboardNav() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold text-white">BTContract</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link to="/dashboard/">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${isActive('/dashboard/')
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'text-purple-600 hover:bg-purple-100'
                }`}>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/dashboard/generate">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-2 ${isActive('/dashboard/generate')
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'text-purple-600 hover:bg-purple-100'
                  }`}
              >
                <Code className="h-4 w-4" />
                Generate
              </Button>
            </Link>
            <Link to="/dashboard/deploy">
              <Button variant={isActive('/dashboard/deploy') ? 'default' : 'ghost'} size="sm" className={`gap-2 ${isActive('/dashboard/deploy')
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'text-purple-600 hover:bg-purple-100'
                  }`}>
                <Upload className="h-4 w-4" />
                Deploy
              </Button>
            </Link>
            <Link to="/dashboard/legal">
              <Button variant={isActive('/dashboard/legal') ? 'default' : 'ghost'} size="sm" className={`gap-2 ${isActive('/dashboard/legal')
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'text-purple-600 hover:bg-purple-100'
                  }`}>
                <FileText className="h-4 w-4" />
                Legal
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                JD
              </div>
            </Button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-gray-700 bg-gray-800 shadow-lg z-50">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm font-medium text-white border-b border-gray-700">
                    My Account
                  </div>
                  <div className="py-1">
                    <Link
                      to="#"
                      className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </div>
                  <div className="border-t border-gray-700 py-1">
                    <Link
                      to="/"
                      className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}