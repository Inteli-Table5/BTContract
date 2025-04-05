"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin } from "lucide-react"

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nodeId, setNodeId] = useState("")
  const [publicKey, setPublicKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock signup - would normally call an API
    router.push("/dashboard")
  }

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-md border-gray-800 bg-gray-950">
        <CardHeader className="space-y-1 items-center text-center">
          <Bitcoin className="h-12 w-12 text-amber-500 mb-2" />
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your details to get started with BTContract</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-900 border-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-900 border-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nodeId">Node ID</Label>
              <Input
                id="nodeId"
                placeholder="Your Lightning Network Node ID"
                value={nodeId}
                onChange={(e) => setNodeId(e.target.value)}
                required
                className="bg-gray-900 border-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publicKey">Public Key</Label>
              <Input
                id="publicKey"
                placeholder="Your Bitcoin Public Key"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                required
                className="bg-gray-900 border-gray-800"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full bg-amber-500 text-black hover:bg-amber-600">
              Sign Up
            </Button>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-500 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

