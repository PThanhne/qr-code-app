import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import QRGenerator from './components/QRGenerator'
import QRScanner from './components/QRScanner'
import './App.css'

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>QR Code Generator & Scanner</h1>
      <QRGenerator />
      <hr />
      <QRScanner />
    </div>
  );
}
