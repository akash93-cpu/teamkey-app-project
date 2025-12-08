import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DisplayTable from './pages/Table.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <DisplayTable />
  </StrictMode>,
)
