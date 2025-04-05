"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bitcoin } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const isLoggedIn = pathname !== "/" && pathname !== "/login" && pathname !== "/signup"

  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
          <Bitcoin className="h-6 w-6 text-amber-500" />
          <span className="text-xl font-bold text-amber-500">BTContract</span>
        </Link>
        <div className="flex gap-2">
          {isLoggedIn ? (
            <Link href="/logout">
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                Logout
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-amber-500 text-black hover:bg-amber-600">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

