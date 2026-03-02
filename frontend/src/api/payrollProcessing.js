import api from "./client";

export async function getPayrollProcessingList() {
    const res = await api.get("/payroll-processing/");
    return Array.isArray(res.data) ? res.data : [];
}