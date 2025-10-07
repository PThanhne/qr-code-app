// src/components/QRScanner.jsx
import { useEffect, useRef } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

export default function QRScanner({ onScan }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const codeReaderRef = useRef(null);
  const lastScanTimeRef = useRef(0);
  const DEBOUNCE_DELAY = 2000; // 2 seconds debounce

  // Function to play beep sound
  const playBeep = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReaderRef.current = codeReader;
    let mounted = true;

    const startScanner = async () => {
      try {
        
        const devices = await BrowserQRCodeReader.listVideoInputDevices();
        const deviceId = devices && devices.length ? devices[0].deviceId : undefined;

        // decodeFromVideoDevice 
        controlsRef.current = await codeReader.decodeFromVideoDevice(
          deviceId,
          videoRef.current,
          (result, error, controls) => {
            if (result && mounted) {
              const now = Date.now();
              
              // Check debounce - only process if enough time has passed
              if (now - lastScanTimeRef.current >= DEBOUNCE_DELAY) {
                lastScanTimeRef.current = now;
                
                // Play beep sound on successful scan
                playBeep();
                
                // Call the parent callback
                onScan(result.getText());
              }
            }
          }
        );
      } catch (err) {
        console.error("ZXing start error:", err);
      }
    };

    startScanner();

    return () => {
      mounted = false;

      
      try {
        controlsRef.current?.stop?.(); 
      } catch (e) {
        console.warn("controls.stop() lỗi:", e);
      }

     
      try {
        const videoEl = videoRef.current;
        const stream = videoEl && videoEl.srcObject;
        if (stream) {
          const tracks = stream.getTracks ? stream.getTracks() : [];
          tracks.forEach((t) => {
            try { t.stop(); } catch (_) {}
          });
          if (videoEl) videoEl.srcObject = null;
        }
      } catch (e) {
        console.warn("stop media tracks lỗi:", e);
      }

      
      try {
        if (codeReaderRef.current && typeof codeReaderRef.current.reset === "function") {
          codeReaderRef.current.reset();
        }
      } catch (e) {
        
      }
    };
  }, [onScan]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Scanner</h2>
      <video
        ref={videoRef}
        style={{ width: 320, height: 240, border: "1px solid #ccc" }}
       
        playsInline
        autoPlay
      />
    </div>
  );
}
