import { Routes, Route, Navigate } from 'react-router-dom'

import App from "./App.jsx";
import DisplayTable from "./pages/Table.jsx";

export default function IndexPage() {

    // React router page

    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/table" element={<DisplayTable />} />
        </Routes>
    )
}