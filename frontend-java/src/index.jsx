import { Routes, Route } from 'react-router-dom'

import App from "./App.jsx";
import NavigationBar from './Navbar.jsx';
import DisplayTable from "./pages/MatchTable.jsx";
import SingleMatchView from './pages/SingleMatch.jsx';
import TeamRosterTable from './pages/TeamRoster.jsx';
import SingleTeamView from './pages/SingleTeam.jsx';
import { StatsHomePage } from './pages/StatisticsHome.jsx';
import StsMain from './pages/StatsMain.jsx';
import SupportPage from './pages/Support.jsx';
import About from './pages/About.jsx';
import Footer from './Footer.jsx';
import UserDashboard from './pages/Dashboard.jsx';
import TeamStats from './pages/TeamStats.jsx';
import Trends from './pages/TrendsPage.jsx';

export default function IndexPage() {

    // React router page
    // App - homepage
    
    return (
        <>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<App />} /> 
                <Route path='/user' element={<UserDashboard />}/>
                <Route path="/table" element={<DisplayTable />} />
                <Route path="/team-roster" element={<TeamRosterTable />} />
                <Route path="/single-match/:id" element={<SingleMatchView />} />
                <Route path="/team-names/:id" element={<SingleTeamView />} />
                <Route path='/stats-home' element={<StatsHomePage />}/>
                <Route path='/sts-main' element={<StsMain />}/>
                <Route path='/trends' element={<Trends />}/>
                <Route path='/teams-stats' element={<TeamStats />}/>
                <Route path='/support' element={<SupportPage />} />
                <Route path='/about-us' element={<About />}/>
            </Routes>
            <Footer />
        </>
    );
}