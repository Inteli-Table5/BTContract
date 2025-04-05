import { DashboardCard } from "../components/DashboardCard"
import { Code, FileText, Upload } from "lucide-react"

export function DashboardPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400">Select an option to get started with your Bitcoin smart contracts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          icon={<Code className="h-6 w-6" />}
          title="Generate Contract"
          description="Create a new Bitcoin smart contract using our templates"
          href="/dashboard/generate"
        />

        <DashboardCard
          icon={<Upload className="h-6 w-6" />}
          title="Deploy Contract"
          description="Deploy your existing contracts to the Bitcoin network"
          href="/dashboard/deploy"
        />

        <DashboardCard
          icon={<FileText className="h-6 w-6" />}
          title="Legal Document"
          description="Generate legal PDF documents for your contracts"
          href="/dashboard/legal"
        />
      </div>
    </div>
  )
}