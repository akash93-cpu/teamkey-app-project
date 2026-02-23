import React, {useState, useEffect} from "react";
import '../css/trends-styles.css';
import { checkStatus } from "../../status";
import { Toaster } from "react-hot-toast";

export default function Trends() {

    const [data, setData] = useState({ allTrendData: [] });
    const [loading, setLoading] = useState(false);

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

    return (
        <>
        <Toaster />
            <div>
                <p>{data.allTrendData.teamName}</p>
                <div>
                    <p>{data.allTrendData.teamName}</p>
                </div>
            </div>
        </>
    )
}