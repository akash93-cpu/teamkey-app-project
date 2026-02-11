import { useState, useEffect } from "react";
import Tabs from 'react-bootstrap/Tabs';
import { Toaster } from "react-hot-toast";
import Tab from 'react-bootstrap/Tab';
import { Chart as ChartJS,
    ArcElement, Tooltip, Legend } from 'chart.js';
import { ListGroup, Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { Doughnut } from "react-chartjs-2";
import '../css/sts-main-styles.css';
import { checkStatus } from "../../status";

export default function StsMain() {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const createEmptyStats = () => ({
        teamName: '',
        total3PtsMade: 0,
        total3PtsMissed: 0,
        total2PtsMade: 0,
        total2PtsMissed: 0,
        totalTeamPts: 0,
        totalFreeThrowsMade: 0,
        totalFreeThrowsMissed: 0,
        overTime: false
    });

    const [data, setData] = useState({ allMatchIds: [] });
    const [loading, setLoading] = useState(false);
    const [eventId, setEventId] = useState();

    const [dataA, setDataA] = useState(createEmptyStats());
    const [dataB, setDataB] = useState(createEmptyStats());

    useEffect(() => {
        if (!eventId) return;
        const fetchTeams = async () => {
            setLoading(true);
            try {
                await checkStatus();
                const res = await fetch(`http://localhost:8080/stats/match-stats/${eventId}`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Authorization": "Basic " + btoa("admin:test") }
                });
                if (!res.ok) throw new Error(res.status);
                const response = await res.json();
                console.log(response[0]);
                setDataA(response[0]);
                setDataB(response[1]);
            } catch (error) { console.error(error) }
            finally { setLoading(false) }
        }
        fetchTeams();
    }, [eventId]);

    useEffect(() => { // to get matchId values
        const fetchData = async () => {
            setLoading(true);
            try {
                await checkStatus();
                const response = await fetch("http://localhost:8080/stats", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Authorization": "Basic " + btoa("admin:test")
                    }
                });

                if (!response.ok) throw new Error(response.status);
                const result = await response.json();
                const allMatchesIdValues = [...new Set(result.map(item => item.matchId))]; // returns an array of all matchIds 
                setData({ allMatchIds: allMatchesIdValues });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (data.allMatchIds.length > 0) {
            setEventId(data.allMatchIds[0]);
        }
    }, [data.allMatchIds]);

    const dataChartA = {
        labels: ['Total 3 Points Made', 'Total 3 Points Missed', 'Total 2 Points Made', 'Total 2 Points Missed', 'Total Free Throws Made', 'Total Free Throws Missed'],
        datasets: [
            {
                label: 'Home Team',
                data: [dataA.total3PtsMade, dataA.total3PtsMissed, dataA.total2PtsMade, dataA.total2PtsMissed, dataA.totalFreeThrowsMade, dataA.totalFreeThrowsMissed],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(189, 36, 219)',
                    'rgb(121, 230, 32)',
                    'rgb(40, 203, 231)'
                ],
                hoverOffset: 4,
            },
        ],
    };

    const dataChartB = {
        labels: ['Total 3 Points Made', 'Total 3 Points Missed', 'Total 2 Points Made', 'Total 2 Points Missed', 'Total Free Throws Made', 'Total Free Throws Missed'],
        datasets: [
            {
                label: 'Away Team',
                data: [dataB.total3PtsMade, dataB.total3PtsMissed, dataB.total2PtsMade, dataB.total2PtsMissed, dataB.totalFreeThrowsMade, dataB.totalFreeThrowsMissed],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(189, 36, 219)',
                    'rgb(121, 230, 32)',
                    'rgb(40, 203, 231)'
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <>
            <Toaster />
            <div className="sts-main">
                    <h4>Statistics for every match</h4>
                <div className="teams-chart">
                    <div className="teams-left">
                        <Card>
                            <div className="chart-wrapper">
                                <div className="chart-box">
                                    <h2 className="chart-center-text">{dataA.teamName}</h2>

                                    <Doughnut
                                        className="chart-main"
                                        data={dataChartA}
                                        options={options}
                                    />
                                </div>

                                <div className="chart-subtext">
                                    <ListGroup>
                                        <ListGroup.Item active style={{ backgroundColor: 'LightSlateGray' }}>
                                            {dataA.totalTeamPts} points
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="teams-divider" />

                    <div className="teams-right">
                        <Card>
                            <div className="chart-wrapper">
                                <div className="chart-box">
                                    <h2 className="chart-center-text">{dataB.teamName}</h2>

                                    <Doughnut
                                        className="chart-main"
                                        data={dataChartB}
                                        options={options}
                                    />
                                </div>

                                <div className="chart-subtext">
                                    <ListGroup>
                                        <ListGroup.Item active style={{ backgroundColor: 'LightSeaGreen' }}>

                                            {dataB.totalTeamPts} points
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
                
                <div className="match-selection-tabs">
                    <Tabs
                        activeKey={eventId}
                        onSelect={(key) => setEventId(key)}
                        id="match-tabs"
                        className="mb-3"
                    >
                        {data.allMatchIds.map((id) => (
                            <Tab eventKey={id} title={id} key={id}>
                                {loading ? (
                                    <div style={{ textAlign: "center", padding: "20px" }}>
                                        Loading match stats...
                                    </div>
                                ) : (
                                    <>
                                    <p style={{ textAlign: 'center' }}>Showing match statistics for <strong>Match {id}</strong></p>
                                    <div className="table-teams">
                                        <div className="home-team-table">
                                            <Table striped hover bordered>
                                                <thead>
                                                    <tr>
                                                        <th>{dataA.teamName}</th>
                                                        <th>Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Total Team Points</td>
                                                        <td>{dataA.totalTeamPts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total 3 Point Attempts</td>
                                                        <td>{dataA.total3PtsAttempts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total 2 Point Attempts</td>
                                                        <td>{dataA.total2PtsAttempts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Free Throw Attempts</td>
                                                        <td>{dataA.totalFreeThrowAttempts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Field Goals Made</td>
                                                        <td>{dataA.totalFieldGoalsMade}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Field Goal Attempts</td>
                                                        <td>{dataA.totalFieldGoalsAttempts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2 Point Efficiency</td>
                                                        <td>{dataA["2PtEfficiency"]} %</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3 Point Efficiency</td>
                                                        <td>{dataA["3PtEfficiency"]} %</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Free Throw Efficiency</td>
                                                        <td>{dataA.freeThrowEfficiency} %</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Overtime</td>
                                                        <td>{dataA.overTime ? "Yes" : "No"}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>

                                        <div className="teams-divider" />

                                        <div className="away-team-table">
                                            <Table striped hover bordered>
                                                <thead>
                                                    <tr>
                                                        <th>{dataB.teamName}</th>
                                                        <th>Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Total Team Points</td>
                                                        <td>{dataB.totalTeamPts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total 3 Point Attempts</td>
                                                        <td>{dataB.total3PtsAttempts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total 2 Point Attempts</td>
                                                        <td>{dataB.total2PtsAttempts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Free Throw Attempts</td>
                                                        <td>{dataB.totalFreeThrowAttempts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Field Goals Made</td>
                                                        <td>{dataB.totalFieldGoalsMade}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Field Goal Attempts</td>
                                                        <td>{dataB.totalFieldGoalsAttempts}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2 Point Efficiency</td>
                                                        <td>{dataB["2PtEfficiency"]} %</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3 Point Efficiency</td>
                                                        <td>{dataB["3PtEfficiency"]} %</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Free Throw Efficiency</td>
                                                        <td>{dataB.freeThrowEfficiency} %</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Overtime</td>
                                                        <td>{dataB.overTime ? "Yes" : "No"}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>

                                    </div>
                                    </>
                                )}
                            </Tab>
                        ))}
                    </Tabs>
                </div>

            </div>
        </>

        // <> - using pills:
        //     <Toaster />
        //     <div className="sts-main">
        //         <div className="match-selection-tabs">
        //             <Tab.Container
        //                 id="match-tabs"
        //                 defaultActiveKey={data.allMatchIds[0]}
        //             >
        //                 <Nav variant="pills" className="mb-3">
        //                     {data.allMatchIds.map((id) => (
        //                         <Nav.Item key={id}>
        //                             <Nav.Link eventKey={id}>{id}</Nav.Link>
        //                         </Nav.Item>
        //                     ))}
        //                 </Nav>
        //             </Tab.Container>
        //         </div>
        //     </div>
        // </>
    )
}