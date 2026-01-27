import { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MyPagination from "./Pagination.jsx";
import { LuLoaderPinwheel } from "react-icons/lu";
import { checkStatus } from "../../status.js";
import { Toaster } from "react-hot-toast";

export default function SingleTeamView() {
    const [data, setData] = useState({
        bands: [],
        totalPage: 0,
        totalRecords: 0
    })

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50); // Changed to 50 records per page
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchTeam = async () => {
            setLoading(true);
            try {
                await checkStatus();
                const response = await fetch(`http://localhost:8080/team-roster/team-names/${id}`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Authorization": "Basic " + btoa("admin:test")
                    }

                });
                if (!response.ok) throw new Error(response.status);
                const result = await response.json();
                setData({
                    bands: result.slice((page - 1) * pageSize, page * pageSize),
                    totalPage: Math.ceil(result.length / pageSize),
                    totalRecords: result.length,
                })

            } catch (error) {
                alert('Error! No data to display!', error)
            } finally {
                setLoading(false);
            }
        }
        fetchTeam()
    }, [page, pageSize, id]);

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
        <div style={{ padding: '20px', marginTop: '50px', maxWidth: '85%', marginRight: 'auto', marginLeft: 'auto' }}>
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
                    </select>
                </div>
                <div>
                    {id}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                    Showing {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, data.totalRecords)} of {data.totalRecords} records
                </div>

            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}><LuLoaderPinwheel /></div>
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
                            {data.bands.length > 0 ? (
                                data.bands.map((band, index) => (
                                    <tr key={index}>
                                        <td>{(page - 1) * pageSize + (index + 1)}</td>
                                        <td>{band.playerId}</td>
                                        <td>{band.playerName}</td>
                                        <td>{band.playerSurname}</td>
                                        <td>{band.teamId}</td>
                                        <td>{band.teamName}</td>
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
        </>
    );
}