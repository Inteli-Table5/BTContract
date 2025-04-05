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
        <Link to="/dashboard">
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
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-4 py-2 font-medium ${activeTab === "custom" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-400"}`}
            >
              Custom Contract
            </button>
          </div>

          {activeTab === "template" && (
            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Contract Type</label>
                <select
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                >
                  <option value="multisig">Multi-signature Wallet</option>
                  <option value="timelock">Time-locked Contract</option>
                  <option value="escrow">Escrow Service</option>
                  <option value="oracle">Oracle Contract</option>
                </select>
              </div>

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
                    <label htmlFor="required-signatures" className="block text-sm font-medium text-gray-300">Required Signatures</label>
                    <input
                      id="required-signatures"
                      type="number"
                      min="2"
                      defaultValue="2"
                      className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signers" className="block text-sm font-medium text-gray-300">Signers (Public Keys, one per line)</label>
                    <textarea
                      id="signers"
                      placeholder="Public key 1\nPublic key 2\nPublic key 3"
                      className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 min-h-[120px]"
                    />
                  </div>
                </div>
              )}

              {/* Other contract types would follow the same pattern */}
            </div>
          )}

          {activeTab === "custom" && (
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <label htmlFor="contract-name" className="block text-sm font-medium text-gray-300">Contract Name</label>
                <input
                  id="contract-name"
                  placeholder="My Custom Contract"
                  className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contract-code" className="block text-sm font-medium text-gray-300">Contract Code</label>
                <textarea
                  id="contract-code"
                  placeholder="// Write your custom Bitcoin script here"
                  className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 font-mono min-h-[300px]"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-700 flex justify-between">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button>Generate Contract</Button>
        </div>
      </div>
    </div>
  )
}