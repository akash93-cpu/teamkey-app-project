import React, { useState, useEffect } from "react";
import '../css/trends-styles.css';
import { checkStatus } from "../../status";
import { Toaster } from "react-hot-toast";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from "react-chartjs-2";

export default function Trends() {

    const [data, setData] = useState({ allTrendData: [] });
    const [loading, setLoading] = useState(false);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await checkStatus();
                const response = await fetch("http://localhost:8080/trends", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Authorization": "Basic " + btoa("admin:test")
                    }
                });

                if (!response.ok) throw new Error(response.status);
                const result = await response.json();
                console.log(result);
                setData({ allTrendData: result });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const actual =
    data.allTrendData.length > 0
        ? data.allTrendData[0].actualScore
        : [];

    const predicted =
    data.allTrendData.length > 0
        ? data.allTrendData[0].predictedScore
        : [];

    const labels =
    data.allTrendData.length > 0
        ? data.allTrendData[0].actualScore.map((_, index) => index + 1)
        : [];

    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: "Actual",
                data: actual,
                fill: false,
                borderColor: "rgb(199, 48, 73)",
                tension: 0.1,
            },
            {
                label: "Predicted",
                data: predicted,
                fill: false,
                borderColor: "rgb(85, 94, 192)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <>
            <Toaster />
            <div className="trends-main">
                <h4>Trend Data</h4>
                  Match data for team {data.allTrendData.length > 0 ? data.allTrendData[0].teamName : "N/A"}

                <div className="scoped-charts">
                    <Line className="line-main"
                        data={dataChart}
                        options={options}
                    />
                </div>
            </div>
        </>
    )
}