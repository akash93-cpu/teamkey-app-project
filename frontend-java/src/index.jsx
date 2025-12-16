import { Routes, Route, Navigate } from 'react-router-dom'

import App from "./App.jsx";
import DisplayTable from "./pages/Table.jsx";
import SingleMatchView from './pages/SingleMatch.jsx';

export default function IndexPage() {

    // React router page

    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/table" element={<DisplayTable />} />
            <Route path="/single-match/:id" element={<SingleMatchView />} />
        </Routes>
    )
}