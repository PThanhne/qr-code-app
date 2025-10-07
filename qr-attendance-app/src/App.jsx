import { useState } from "react";
import QRScanner from "./components/QRScanner";
import AttendanceList from "./components/AttendanceList";
import "./styles.css";

export default function App() {
  const [attendance, setAttendance] = useState([]);

  const handleScan = (data) => {
    if (!data.startsWith("ATTEND:")) return;

    const mssv = data.replace("ATTEND:", "").trim();
    const time = new Date().toLocaleString();

    setAttendance((prev) => [...prev, { mssv, time }]);
  };

  const handleReset = () => setAttendance([]);

  const handleExportCSV = () => {
    const csv =
      "MSSV,Thời gian\n" +
      attendance.map((a) => `${a.mssv},${a.time}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
  };

  return (
    <div className="container">
      <h1>QR Attendance</h1>
      <div className="main-content">
        <div className="scanner-section">
          <QRScanner onScan={handleScan} />
          <div className="buttons">
            <button onClick={handleExportCSV}>Xuất CSV</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
        <AttendanceList data={attendance} />
      </div>
    </div>
  );
}
