import React, { useState } from "react";
import "./index.css";

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("prakash");
  const [qrSize, setQrSize] = useState("200");

  async function generateQr() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;
      setImg(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQr() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="app-container">
        <h1>QR-CODE GENERATOR</h1>
        {loading && <p>Please Wait !!!</p>}
        {img && <img alt="qr-img" className="qr-img" src={img} />}
        <div>
          <label className="input-label" htmlFor="dataInput">
            QR-Code:
          </label>
          <input
            type="text"
            id="dataInput"
            value={qrData}
            placeholder="Enter data for Qr-Code"
            onChange={(e) => setQrData(e.target.value)}
          />

          <label className="input-label" htmlFor="sizeInput">
            Image Size : (eg.150)
          </label>
          <input
            type="text"
            id="sizeInput"
            value={qrSize}
            placeholder="Enter image size"
            onChange={(e) => setQrSize(e.target.value)}
          />
          <button className="generate-btn" onClick={generateQr} disabled={loading}>
            Generate Qr Code
          </button>
          <button className="download-btn" onClick={downloadQr}>
            Download Qr Code
          </button>
        </div>
      </div>
    </>
  );
};

export default QrCode;