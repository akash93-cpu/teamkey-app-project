import { useState, useEffect } from "react";
import { checkStatus } from "../../status";
import { Toaster } from "react-hot-toast";
import { Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Carousel } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Tooltip, Legend } from "chart.js";
import '../css/team-stats-styles.css';
export default function TeamStats() {

    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

    const [data, setData] = useState({
        stats: []
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllTeams = async () => {
            setLoading(true);
            try {
                await checkStatus();
                const result = await fetch(`http://localhost:8080/teams`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Authorization": "Basic " + btoa("admin:test")
                    }
                });
                if (!result.ok) throw new Error(result.status);
                const response = await result.json();
                setData({ stats: response });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
            finally { setLoading(false); }
        }
        fetchAllTeams();
    }, [])

    // Bar chart config
    const labels = ['Games Played', 'Games Won', 'Games Lost'];

    const options = {
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return (
        <>
            <Toaster />
            <div className="teams-charts-main">
            <h2>Team statistics</h2>
            <Carousel>
                {data.stats.map((team) => {
                    const chartData = {
                        labels,
                        datasets: [
                            {
                                label: team.teamName,
                                data: [
                                    team.gamesPlayed,
                                    team.gamesWon,
                                    team.gamesLost,
                                    team.gamesDraw
                                ],
                                backgroundColor: [
                                    "rgba(54, 162, 235, 0.6)",
                                    "rgba(75, 192, 192, 0.6)",
                                    "rgba(255, 99, 132, 0.6)",
                                    "rgba(255, 205, 86, 0.6)"
                                ],
                                borderWidth: 1
                            }
                        ]
                    };
                    return (
                        <Carousel.Item key={team.teamId}>
                            <div className="single-team-chart">
                                <Bar data={chartData} options={options} />
                            </div>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
            <hr />
            </div>

            <div style={{ padding: '20px', maxWidth: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
                ) : (
                    <>
                    <p>All teams</p>
                        <Table striped bordered hover className="custom-table">
                            <thead>
                                <tr>
                                    <th>Team ID</th>
                                    <th>Team Name</th>
                                    <th>Games Played</th>
                                    <th>Games Won</th>
                                    <th>Games Lost</th>
                                    <th>Games Draw</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.stats.length > 0 ? (
                                    data.stats.map((band, index) => (
                                        <tr key={index}>
                                            <td>{band.teamId}</td>
                                            <td>{band.teamName}</td>
                                            <td>{band.gamesPlayed}</td>
                                            <td>{band.gamesWon}</td>
                                            <td>{band.gamesLost}</td>
                                            <td>{band.gamesDraw}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" style={{ textAlign: 'center' }}>
                                            No data available
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </Table>
                    </>
                )}
            </div>
        </>
    )

}