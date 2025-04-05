import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { ArrowLeft, FileText } from "lucide-react"

export function LegalDocumentPage() {
  const [documentType, setDocumentType] = useState("agreement")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">Legal Document</h1>
      </div>

      <div className="max-w-4xl rounded-lg border border-gray-700 bg-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Legal Document Generator</h2>
          <p className="text-gray-400">Generate legal PDF documents for your Bitcoin smart contracts</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Select a contract</label>
            {/* ContractList component would go here */}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
            >
              <option value="agreement">Smart Contract Agreement</option>
              <option value="terms">Terms and Conditions</option>
              <option value="disclosure">Risk Disclosure</option>
              <option value="custom">Custom Document</option>
            </select>
          </div>

          {documentType === "custom" && (
            <div className="space-y-2">
              <label htmlFor="document-title" className="block text-sm font-medium text-gray-300">Document Title</label>
              <input
                id="document-title"
                placeholder="Custom Legal Document"
                className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="parties" className="block text-sm font-medium text-gray-300">Parties Involved</label>
            <textarea
              id="parties"
              placeholder="Enter the names and details of all parties involved in this contract"
              className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-300">Jurisdiction</label>
            <input
              id="jurisdiction"
              placeholder="e.g., California, United States"
              className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2"
            />
          </div>

          {documentType === "custom" && (
            <div className="space-y-2">
              <label htmlFor="custom-clauses" className="block text-sm font-medium text-gray-300">Custom Clauses</label>
              <textarea
                id="custom-clauses"
                placeholder="Enter any custom clauses you want to include in the document"
                className="w-full rounded-md border border-gray-700 bg-gray-700 text-white px-3 py-2 min-h-[150px]"
              />
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-700 flex justify-end">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>
        </div>
      </div>
    </div>
  )
}