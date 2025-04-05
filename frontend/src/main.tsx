import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import  Home  from './pages/Home'
import { DashboardLayout } from './pages/DashboardLayout'
import { DashboardPage } from './pages/DashboardPage'
import { DeployContractPage } from './pages/DeployContractPage'
import { GenerateContractPage } from './pages/GenerateContractPage'
import { LegalDocumentPage } from './pages/LegalContractPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard/deploy" element={<DeployContractPage />} />
          <Route path="/dashboard/generate" element={<GenerateContractPage />} />
          <Route path="/dashboard/legal" element={<LegalDocumentPage />} />
        </Route> {/* Fechando corretamente o <Route> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)