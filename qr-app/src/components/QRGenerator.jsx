import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";


export default function QRGenerator() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("qr_history")) || [];
  });

  const generate = () => {
    if (text.trim()) {
      const newHistory = [text, ...history].slice(0, 5); // chỉ lưu 5 cái gần nhất
      setHistory(newHistory);
      localStorage.setItem("qr_history", JSON.stringify(newHistory));
    }
  };

  return (
    <div>
      <h2>QR Generator</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập text hoặc link..."
      />
      <button onClick={generate}>Generate</button>

      {text && <QRCodeCanvas value={text} size={200} />}

      <h3>Lịch sử</h3>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
