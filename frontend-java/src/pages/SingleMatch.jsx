import { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MyPagination from "./Pagination.jsx";
import { checkStatus } from "../../status.js";
import { Toaster } from "react-hot-toast";
import { Breadcrumb } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import { CiViewTable } from "react-icons/ci";
import { MdOutlineDataset } from "react-icons/md";
import '../css/single-match-styles.css';
export default function SingleMatchView() {

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
        const fetchMatch = async () => {
            setLoading(true);
            try {
                await checkStatus();
                const response = await fetch(`http://localhost:8080/scraped/matches/${id}`, {
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
                alert("No data to display! ", error)
            } finally {
                setLoading(false);
            }
        }
        fetchMatch()
    }, [page, pageSize, id])

    const handlePageChange = useCallback((p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1); // Reset to first page when changing page size
    };

    return (
        <div className="single-match-div">
            <Toaster />
            <div style={{ padding: '20px', maxWidth: '85%', marginRight: 'auto', marginLeft: 'auto' }}>
                <Breadcrumb className="breadcrumb-pills">
                    <Breadcrumb.Item href="/">
                        <AiOutlineHome id="bread-icons" size={16} />
                        <span>Home</span>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item href="/table">
                        <CiViewTable id="bread-icons" size={16} />
                        <span>Table</span>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>
                        <MdOutlineDataset id="bread-icons" size={16} />
                        <span>Match {id}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div style={{
                    marginBottom: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid black',
                    padding: '5px',
                    borderRadius: '0.7rem',
                    backgroundColor: '#f3f4f6'
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
                    <div>
                        Match ID {id}
                    </div>
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
    );
}