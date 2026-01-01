import { Routes, Route } from 'react-router-dom'

import App from "./App.jsx";
import NavigationBar from './Navbar.jsx';
import DisplayTable from "./pages/Table.jsx";
import SingleMatchView from './pages/SingleMatch.jsx';
import TeamRosterTable from './pages/TeamRoster.jsx';
import SingleTeamView from './pages/SingleTeam.jsx';

export default function IndexPage() {

    // React router page

    return (
        <>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/table" element={<DisplayTable />} />
                <Route path="/team-roster" element={<TeamRosterTable />} />
                <Route path="/single-match/:id" element={<SingleMatchView />} />
                <Route path="/team-roster/team/:id" element={<SingleTeamView />} />
            </Routes>
        </>
    );
}