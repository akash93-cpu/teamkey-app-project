import { useState, useEffect, useCallback } from "react";
import { Table, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyPagination from "./Pagination.jsx";
import Dropdown from 'react-bootstrap/Dropdown';
import { LuLoaderPinwheel } from "react-icons/lu";
import { checkStatus } from "../../status.js";
import { Toaster } from "react-hot-toast";

import '../css/team-roster-styles.css';

export default function TeamRosterTable() {

    const [data, setData] = useState({
        teamData: [],
        totalPage: 0,
        totalRecords: 0,
        allTeams: []
    })
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [loading, isLoading] = useState(false);

    const navigate = useNavigate();

    const handleSelect = (eventKey) => {
        if (eventKey) {
            navigate(`/team-names/${eventKey}`);
        }
    };

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
                
                setData({
                    teamData: result.slice((page - 1) * pageSize, page * pageSize),
                    totalPage: Math.ceil(result.length / pageSize),
                    totalRecords: result.length,
                    allTeams: allTeamNames
                });

            } catch (error) {
                console.error(error);
            } finally {
                isLoading(false);
            }
        }
        fetchData();
    }, [page, pageSize]);


    const handlePageChange = useCallback((p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1); // Reset to first page when changing page size
    };

    return (
        <>
        <Toaster />
        <div className="teams-roster-main">

        <div style={{ padding: '20px', marginTop: '50px', maxWidth: '85%', marginRight: 'auto', marginLeft: 'auto' }}>
            <div className="top-heading">

            <p>Japanese B League</p>
                <div className="team-filter">
                    <label htmlFor="teamNames">Filter</label>

                    <DropdownButton 
                    title='--- Select Team----'
                    onSelect={handleSelect}
                    variant="light"
                    >
                        {data.allTeams.map((id) => (
                            <Dropdown.Item key={id} eventKey={id}>
                                {id}
                            </Dropdown.Item>
                        ))}

                    </DropdownButton>

                </div>
            <p>2020/2021</p>

            </div>

            <div style={{ 
                marginTop: '10px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem'   }}>

                <div>
                    <label style={{ marginRight: '10px', color: "antiquewhite" }}>Records per page:</label>
                    <select 
                        value={pageSize} 
                        onChange={handlePageSizeChange}
                        style={{ padding: '5px' }}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>

                <div style={{ fontSize: '14px', color: 'antiquewhite' }}>
                    Showing {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, data.totalRecords)} of {data.totalRecords} records
                </div>

            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px', color: 'antiquewhite' }}><LuLoaderPinwheel size={35} style={{color: 'antiquewhite'}}/>Loading...</div>
            ) : (
                <>
                    <Table striped bordered hover className="custom-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Player ID</th>
                                <th>Player Name</th>
                                <th>Player Surname</th>
                                <th>Team ID</th>
                                <th>Team Name</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {data.teamData.length > 0 ? (
                                data.teamData.map((team, index) => (
                                    <tr key={index}>
                                        <td>{(page - 1) * pageSize + (index + 1)}</td>
                                        <td>{team.playerId}</td>
                                        <td>{team.playerName}</td>
                                        <td>{team.playerSurname}</td>
                                        <td>{team.teamId}</td>
                                        <td>{team.teamName}</td>
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

                    {data.totalPage > 1 && (
                        <MyPagination 
                            total={data.totalPage}
                            current={page}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
        </div>
        </>
    );
}