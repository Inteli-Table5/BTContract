import { ArrowRight, Bitcoin, Code, Zap, FileText } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black via-black to-gray-900">
      <header className="sticky top-0 z-50 w-full border-b border-yellow-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bitcoin className="h-6 w-6 text-yellow-500" />
              <div className="absolute inset-0 rounded-full bg-yellow-500/20 animate-ping opacity-75"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-500 bg-clip-text text-transparent">BTContract</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 text-xs sm:text-sm">
                Login
              </Button>
            </Link>
            <Link to="/login?signup=true">
              <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-yellow-500 hover:from-yellow-600 hover:to-orange-600 text-black text-xs sm:text-sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Modificado para ficar igual à imagem */}
        <section className="w-full py-12 md:py-20 lg:py-24 relative">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                Bitcoin Smart Contract Platform
              </h1>
              <p className="max-w-[600px] text-gray-400 text-lg md:text-xl">
                Generate, deploy, and manage Bitcoin smart contracts with ease. The ultimate platform for your blockchain innovations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/login?signup=true">
                  <Button size="lg" className="w-full sm:w-auto gap-1.5 bg-gradient-to-r from-yellow-500 to-yellow-500 hover:from-yellow-600 hover:to-orange-600 text-black">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-gradient-to-b from-black to-gray-900/50 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-200px,#1a1a1a,transparent)]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                <Zap className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers everything you need to work with Bitcoin smart contracts
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-yellow-500/20 bg-black/50 p-6 hover:border-yellow-500/50 hover:bg-black/70 transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
                  <Code className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Generate Contracts</h3>
                <p className="text-center text-gray-400">
                  Create custom Bitcoin smart contracts with our intuitive interface
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border border-yellow-500/20 bg-black/50 p-6 hover:border-yellow-500/50 hover:bg-black/70 transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
                  <Zap className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Deploy Contracts</h3>
                <p className="text-center text-gray-400">
                  Deploy your contracts to the Bitcoin network with a single click
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border border-yellow-500/20 bg-black/50 p-6 hover:border-yellow-500/50 hover:bg-black/70 transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
                  <FileText className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Legal Documents</h3>
                <p className="text-center text-gray-400">
                  Generate legal PDF documents for your smart contracts
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home