import { useState, useEffect } from "react";
import { checkStatus } from "../../status";
import { Toaster } from "react-hot-toast";
import { Table } from "react-bootstrap";

import '../css/team-stats-styles.css';
export default function TeamStats() {

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
                if(!result.ok) throw new Error(result.status);
                const response = await result.json();
                setData({ stats: response });
                console.log(response);
            } catch (error) { 
                console.error(error);
            }
                finally{ setLoading(false); }    
        } 
        fetchAllTeams();
    }, [])

    return (
        <>
            <Toaster />
            <div style={{ padding: '20px', marginTop: '80px', maxWidth: '50%', marginRight: 'auto', marginLeft: 'auto' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
                ) : (
                    <>
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