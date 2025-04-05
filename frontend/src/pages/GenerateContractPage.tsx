import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { ArrowLeft, Save } from "lucide-react"

export function GenerateContractPage() {
  const [contractType, setContractType] = useState("multisig")
  const [activeTab, setActiveTab] = useState("template")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Link to="/dashboard/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">Generate Contract</h1>
      </div>

      <div className="max-w-4xl rounded-lg border border-gray-700 bg-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Contract Generator</h2>
          <p className="text-gray-400">Create a new Bitcoin smart contract by filling out the form below</p>
        </div>
        
        <div className="p-6">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab("template")}
              className={`px-4 py-2 font-medium ${activeTab === "template" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-400"}`}
            >
              Use Template
            </button>
          </div>

          {activeTab === "template" && (
            <div className="space-y-6 mt-6">
              {contractType === "multisig" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="contract-name" className="block text-sm font-medium text-gray-300">Contract Name</label>
                    <input
                      id="contract-name"
                      placeholder="My Multi-sig Wallet"
                      className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="recipient-address" className="block text-sm font-medium text-gray-300">Recipient Address</label>
                    <input
                      id="recipient-address"
                      placeholder="Recipient Address"
                      className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="value" className="block text-sm font-medium text-gray-300">Value</label>
                    <input
                      id="value"
                      placeholder="0.01 BTC"
                      className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="percentage" className="block text-sm font-medium text-gray-300">Percentage</label>
                    <input
                      id="percentage"
                      placeholder="50%"
                      className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-700 flex justify-start gap-x-4">
          <Button variant="outline" className="hover:bg-gray-100 hover:border-gray-400 transition-colors">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" className="hover:bg-gray-100 hover:border-gray-400 transition-colors">Generate Contract</Button>
        </div>
      </div>
    </div>
  )
}