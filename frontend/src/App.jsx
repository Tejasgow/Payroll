import { useState } from "react";
import Login from "./pages/Login";
import PayrollSalaryTable from "./pages/PayrollSalaryTable";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  }

  return (
    <div>
      <div style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
        <b>Payroll Frontend</b>
        {isLoggedIn && (
          <button style={{ marginLeft: 15 }} onClick={logout}>
            Logout
          </button>
        )}
      </div>

      {isLoggedIn ? (
        <PayrollSalaryTable />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}