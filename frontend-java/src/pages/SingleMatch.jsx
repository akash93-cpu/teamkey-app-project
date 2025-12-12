import { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Pagination } from "react-bootstrap";

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

export default function SingleMatchView() {

    const [data, setData] = useState({
        bands: [],
    })

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const response = await fetch("http://localhost:8080/scraped/matches/40189", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Authorization": "Basic " + btoa("admin:test")
                    }
                });

                if (!response.ok) throw new Error(response.status);
                const result = await response.json();
                setData({ bands: result })

            } catch (error) {
                alert("No data to display! ", error)
            }
        }
        fetchMatch()
    }, [])

    return (

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
                            <td>any</td>
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
        </>


    )


}