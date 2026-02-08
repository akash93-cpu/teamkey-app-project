import { useState, useEffect, useCallback } from "react";
import { DropdownButton, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import MyPagination from "./Pagination.jsx";
import { checkStatus } from "../../status.js";
import { Toaster } from "react-hot-toast";
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import "../css/table-page.css";

export default function DisplayTable() {

    const [data, setData] = useState({
        bands: [],
        totalPage: 0,
        totalRecords: 0,
        allMatchIds: [],
    });
    const [matchEvents, setMatchEvents] = useState({ matchEvent: [] })
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50); // Changed to 50 records per page
    const [loading, setLoading] = useState(false);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const navigate = useNavigate();
    const handleSelect = (eventKey) => {
        if (eventKey) {
            navigate(`/single-match/${eventKey}`);
        }
    };

    useEffect(() => { // first fetch query
        const fetchData = async () => {
            setLoading(true);
            try {
                await checkStatus();
                const response = await fetch("http://localhost:8080/scraped", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Authorization": "Basic " + btoa("admin:test")
                    }

                });

                if (!response.ok) throw new Error(response.status);

                const result = await response.json();
                const allMatchesIdValues = [...new Set(result.map(item => item.matchId))]; // returns an array of all matchIds 

                setData({
                    bands: result.slice((page - 1) * pageSize, page * pageSize),
                    totalPage: Math.ceil(result.length / pageSize),
                    totalRecords: result.length,
                    allMatchIds: allMatchesIdValues
                });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, pageSize]);

    useEffect(() => { // second fetch query
        const fetchInfo = async () => {
            setLoadingEvents(true);
            try {
                await checkStatus();
                const response = await fetch("http://localhost:8080/scraped/matches/getAllEvents", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Authorization": "Basic " + btoa("admin:test")
                    }

                });

                if (!response.ok) throw new Error(response.status);

                const res = await response.json();
                setMatchEvents({ matchEvent: res });
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingEvents(false);
            }
        };
        fetchInfo();
    }, []);

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
            <div className="main-div-table" style={{ padding: '30px', color: 'whitesmoke' }}>
                <div className="heading-div">
                    <h1 id="top-p-tag">All matches</h1>
                </div>
                <div className="top-heading-block">

                    <p id="p-tag">Japanese B League</p>

                    <div className="match-filter">
                        <label htmlFor="matchIds">Filter</label>
                        <DropdownButton
                            id="match-id-dropdown"
                            title="--- Select Match ID ---"
                            onSelect={handleSelect}
                            variant="light"
                        >
                            {data.allMatchIds.map((id) => (
                                <Dropdown.Item key={id} eventKey={id}>
                                    {id}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>

                    <p id="p-tag">2020/2021</p>

                </div>

                <div style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem'
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
                            <option value="100">100</option>
                        </select>
                    </div>

                    <div style={{ fontSize: '14px', color: 'whitesmoke' }}>
                        Showing {((page - 1) * pageSize) + 1} - {Math.min(page * pageSize, data.totalRecords)} of {data.totalRecords} records
                    </div>

                </div>
                <div className="table-section">
                    <div className="sidebar">
                        <hr />
                        <p>Total PBP events: {data.totalRecords}</p>
                        <hr />
                        <p>PBP events per match</p>

                        {loadingEvents ? (
                            <div style={{ textAlign: 'center', padding: '50px' }}>Loading data...</div>
                        ) : (
                            <div>
                                {matchEvents.matchEvent.length > 0 ? (
                                    matchEvents.matchEvent.map((match, index) => (
                                        <div key={index}>
                                            <p>Match ID {match.matchId}</p>
                                            <p>Events: {match.eventsCount}</p>
                                            <hr />
                                        </div>
                                    ))) : (
                                    <p>No data!</p>

                                )}
                            </div>
                        )}

                    </div>

                    <div className="main-table">

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
                        ) : (
                            <>
                                <Table striped bordered hover className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>ID</th>
                                            <th>Match ID</th>
                                            <th>Team ID</th>
                                            <th>A team points</th>
                                            <th>B team points</th>
                                            <th>Quarter</th>
                                            <th>Action</th>
                                            <th>Time</th>
                                            <th>Player ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.bands.length > 0 ? (
                                            data.bands.map((band, index) => (
                                                <tr key={index}>
                                                    <td>{(page - 1) * pageSize + (index + 1)}</td>
                                                    <td>{band.id}</td>
                                                    <td>{band.matchId}</td>
                                                    <td>{band.teamId}</td>
                                                    <td>{band.ateamPoints}</td>
                                                    <td>{band.bteamPoints}</td>
                                                    <td>{band.quarter}</td>
                                                    <td>{band.action}</td>
                                                    <td>{band.time}</td>
                                                    <td>{band.playerId}</td>
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

            </div>
        </>
    );
}