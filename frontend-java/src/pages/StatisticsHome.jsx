import { Button } from 'react-bootstrap';
import '../css/statistics-home.css';

export const StatsHomePage = () => {
    return (
        <>
            <div className='stat-page-section-1'>
                <h3>Match Statistics</h3>
                <p>Match-level analytics provides detailed statistical data on each and every match. Each game is analyzed using metrics such as 3-point and 2-point shots and also
                    free throws for each teams per game. These provide further insights to identifying trends for all teams using AI powered technologies.
                </p>
                <Button className='stats-gradient-btn' href="/sts-main">
                    Go to match statistics
                </Button>

            </div>
            <div className='stat-page-section-2'>
                <h3>Team Statistics</h3>
                <p>Browse through each and every team's own statistical data. These figures are based on data extracted by all of the mathces/games played by every one
                    of the teams.
                </p>
                <Button className='stats-gradient-btn-2' href='/teams-stats'>Go to team statistics</Button>
            </div>
        </>
    )
}