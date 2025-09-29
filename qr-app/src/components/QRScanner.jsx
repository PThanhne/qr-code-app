import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

export default function QRScanner() {
  const videoRef = useRef(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (res) => {
        if (res) setResult(res.getText());
      })
      .catch((err) => console.error(err));

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h2>QR Scanner</h2>
      <video ref={videoRef} style={{ width: "300px" }} />
      <p>Kết quả: {result}</p>
    </div>
  );
}
