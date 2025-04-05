import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { ArrowLeft, Upload } from "lucide-react"

export function DeployContractPage() {
  const [deployMethod, setDeployMethod] = useState("existing")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">Deploy Contract</h1>
      </div>

      <div className="max-w-4xl rounded-lg border border-gray-700 bg-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Contract Deployment</h2>
          <p className="text-gray-400">Deploy your Bitcoin smart contract to the network</p>
        </div>
        
        <div className="p-6">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setDeployMethod("existing")}
              className={`px-4 py-2 font-medium ${deployMethod === "existing" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-400"}`}
            >
              Existing Contract
            </button>
            <button
              onClick={() => setDeployMethod("import")}
              className={`px-4 py-2 font-medium ${deployMethod === "import" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-400"}`}
            >
              Import Contract
            </button>
          </div>

          {deployMethod === "existing" && (
            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Select a contract to deploy</label>
                {/* ContractList component would go here */}
              </div>

              <div className="space-y-2">
                <label htmlFor="network" className="block text-sm font-medium text-gray-300">Network</label>
                <div className="flex items-center space-x-2">
                  <input
                    id="network"
                    value="Bitcoin Testnet"
                    readOnly
                    className="flex-1 rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                  />
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="fee" className="block text-sm font-medium text-gray-300">Transaction Fee (sats/vB)</label>
                <input
                  id="fee"
                  type="number"
                  defaultValue="5"
                  className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                />
              </div>
            </div>
          )}

          {deployMethod === "import" && (
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <label htmlFor="contract-name" className="block text-sm font-medium text-gray-300">Contract Name</label>
                <input
                  id="contract-name"
                  placeholder="Imported Contract"
                  className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contract-code" className="block text-sm font-medium text-gray-300">Contract Code</label>
                <textarea
                  id="contract-code"
                  placeholder="Paste your contract code here"
                  className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 font-mono min-h-[200px]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="network" className="block text-sm font-medium text-gray-300">Network</label>
                <div className="flex items-center space-x-2">
                  <input
                    id="network"
                    value="Bitcoin Testnet"
                    readOnly
                    className="flex-1 rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                  />
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="fee" className="block text-sm font-medium text-gray-300">Transaction Fee (sats/vB)</label>
                <input
                  id="fee"
                  type="number"
                  defaultValue="5"
                  className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-700 flex justify-end">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Deploy Contract
          </Button>
        </div>
      </div>
    </div>
  )
}