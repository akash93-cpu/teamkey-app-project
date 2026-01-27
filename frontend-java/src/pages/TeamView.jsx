import { useState, useEffect } from 'react';
import { checkStatus } from '../../status';
import { Toaster } from 'react-hot-toast';
import { LuLoaderPinwheel } from "react-icons/lu";
import '../css/teams-view.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

export default function Teams() {
    
    const [data, setData] = useState({ allTeams: [] });
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            isLoading(true);
            try {
                await checkStatus();
                const response = await fetch("http://localhost:8080/team-roster", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Authorization": "Basic " + btoa("admin:test")
                    }
                });

                if (!response.ok) throw new Error(response.status);
                const result = await response.json();
                const allTeamNames = [...new Set(result.map(item => item.teamName))]; // returns an array of all teamNames 
                console.log(allTeamNames);

                setData({ allTeams: allTeamNames });

            } catch (e) {
                console.error(e)
            } finally {
                isLoading(false);
            }
        }
        fetchData()
    }, [])

    return (
        <>
        <div className='teams-div'>
        <Toaster />
        {loading ? (
            <div style={{ textAlign: 'center', color: 'antiquewhite', paddingTop: '23rem' }}><LuLoaderPinwheel size={35} style={{color: 'antiquewhite'}}/>Loading...</div>
        ) : (
        <div>
            <div className='team-header'>
                <h4>Browse through the complete list of teams here. See the overview of each team's detailed information.</h4>
            </div>
            <div className='team-cards'>
                {data.allTeams.length > 0 && (
                    data.allTeams.map((team, index) => (
                        <div key={index}>
                        <Card className="team-card">
                            <Card.Body>
                                <Card.Title>{team}</Card.Title>
                                <hr className="team-card-divider" />

                                <Button className="team-card-btn">View now</Button>
                            </Card.Body>
                        </Card>
                        </div>
                    ))
                )}
            </div>
            
        </div>)}
        </div>
        </>
    )

}