import { Routes, Route } from 'react-router-dom'

import App from "./App.jsx";
import NavigationBar from './Navbar.jsx';
import DisplayTable from "./pages/MatchTable.jsx";
import SingleMatchView from './pages/SingleMatch.jsx';
import TeamRosterTable from './pages/TeamRoster.jsx';
import SingleTeamView from './pages/SingleTeam.jsx';
import Footer from './Footer.jsx';

export default function IndexPage() {

    // React router page
    // App - homepage
    
    return (
        <>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<App />} /> 
                <Route path="/table" element={<DisplayTable />} />
                <Route path="/team-roster" element={<TeamRosterTable />} />
                <Route path="/single-match/:id" element={<SingleMatchView />} />
                <Route path="/team-names/:id" element={<SingleTeamView />} />
            </Routes>
            <Footer />
        </>
    );
}