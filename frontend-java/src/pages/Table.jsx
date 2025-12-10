import { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import "../css/tablePage.css";

function MyPagination({ total, current, onPageChange }) {
    const maxVisible = 7; // Maximum number of page buttons to show
    let items = [];

    // Previous button
    if (current > 1) {
        items.push(
            <Pagination.Prev 
                key="prev" 
                onClick={() => onPageChange(current - 1)}
            />
        );
    }

    // First page
    items.push(
        <Pagination.Item
            key={1}
            active={current === 1}
            onClick={() => onPageChange(1)}
        >
            1
        </Pagination.Item>
    );

    // Calculate range of pages to show
    let startPage, endPage;
    
    if (total <= maxVisible) {
        // Show all pages if total is less than maxVisible
        startPage = 2;
        endPage = total;
    } else {
        // Calculate start and end pages
        const halfVisible = Math.floor((maxVisible - 2) / 2);
        
        if (current <= halfVisible + 2) {
            startPage = 2;
            endPage = maxVisible - 1;
        } else if (current >= total - halfVisible - 1) {
            startPage = total - maxVisible + 2;
            endPage = total - 1;
        } else {
            startPage = current - halfVisible;
            endPage = current + halfVisible;
        }
    }

    // Left ellipsis
    if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-left" disabled />);
    }

    // Middle pages
    for (let page = startPage; page <= endPage; page++) {
        items.push(
            <Pagination.Item
                key={page}
                active={page === current}
                onClick={() => onPageChange(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    // Right ellipsis
    if (endPage < total - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis-right" disabled />);
    }

    // Last page (only if there's more than 1 page)
    if (total > 1) {
        items.push(
            <Pagination.Item
                key={total}
                active={current === total}
                onClick={() => onPageChange(total)}
            >
                {total}
            </Pagination.Item>
        );
    }

    // Next button
    if (current < total) {
        items.push(
            <Pagination.Next 
                key="next" 
                onClick={() => onPageChange(current + 1)}
            />
        );
    }

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <Pagination size="sm">{items}</Pagination>
            <div style={{ fontSize: '14px', color: '#666' }}>
                Page {current} of {total}
            </div>
        </div>
    );
}

export default function DisplayTable() {
    const [data, setData] = useState({
        bands: [],
        totalPage: 0,
        totalRecords: 0
    });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50); // Changed to 50 records per page
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8080/scraped", {
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
                    totalRecords: result.length
                });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

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
                        <option value="100">100</option>
                    </select>
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
    );
}