import React from "react";
import { Table } from "react-bootstrap";

export default function DisplayTable({ headers = ["ID", "Name", "Email"], rows = [[1, "John Doe", "john@example.com"],
[2, "Jane Smith", "jane@example.com"] ] }) {

    return (
        <React.Fragment>
            <Table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    background: "#f5f5f5",
                                }}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "8px",
                                    }}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );

}