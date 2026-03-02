import { useEffect, useState } from "react";
import { getPayrollProcessingList } from "../api/payrollProcessing";

export default function PayrollSalaryTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const d = await getPayrollProcessingList();
                setData(d);
            } catch (e) {
                setError(e?.response?.data?.detail || "Failed to load payroll data");
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Payroll Salary</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}