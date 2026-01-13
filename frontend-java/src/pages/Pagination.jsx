import { Pagination } from "react-bootstrap";

export default function MyPagination({ total, current, onPageChange }) { 
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
            key="page-1"
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
        if (page === 1 || page === total) continue;

        items.push(
            <Pagination.Item
                key={`page-${page}`}
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
                key={`page-${total}`}
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
            <div style={{ fontSize: '14px', color: '#f3f3f3' }}>
                Page {current} of {total}
            </div>
        </div>

    );
}