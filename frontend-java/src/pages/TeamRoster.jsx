import { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyPagination from "./Pagination.jsx";

export default function TeamRosterTable() {

    const [data, setData] = useState({
        teamData: [],
        totalPage: 0,
        totalRecords: 0,
        allTeamIds: []
    })
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [loading, isLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            isLoading(true);
            try {
                const response = await fetch("http://localhost:8080/team-roster", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Authorization": "Basic " + btoa("admin:test")
                    }
                });

                if (!response.ok) throw new Error(response.status);

                const result = await response.json();
                const allTeamIdValues = [...new Set(result.map(item => item.teamId))]; // returns an array of all matchIds 
                console.log(allTeamIdValues);
                
                setData({
                    teamData: result.slice((page - 1) * pageSize, page * pageSize),
                    totalPage: Math.ceil(result.length / pageSize),
                    totalRecords: result.length,
                    allTeamIds: allTeamIdValues
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

        <div style={{ padding: '20px' }}>
            <div style={{ 
                marginBottom: '15px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <label style={{ marginRight: '10px' }}>Records per page:</label>
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
                
                {/* <div>
                    <label htmlFor="matchIds" style={{ marginRight: '10px' }}>Filter</label>

                    <select id="matchIds" onChange={(e) => {
                        const id = e.target.value;
                        if (id) navigate(`/single-match/${id}`)
                    }}>
                        <option value="">--- Select Team ID ---</option>
                        {data.allMatchIds.map((id) => (
                            <option key={id} value={id}>{id}</option>
                        ))}
                    </select>
                </div> */}

                <div style={{ fontSize: '14px', color: '#666' }}>
                    Showing {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, data.totalRecords)} of {data.totalRecords} records
                </div>

            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
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
    );
}