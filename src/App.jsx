import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function App() {
  const [text, setText] = useState('');

  // ฟังก์ชันสำหรับดาวน์โหลดภาพ QR Code เป็นไฟล์ PNG
  const handleDownload = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'my-qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>สร้าง QR Code ของคุณ</h1>
      
      {/* ช่องกรอกข้อมูล */}
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="ใส่ลิงก์หรือข้อความที่นี่..." 
        style={{ padding: '10px', width: '300px', marginBottom: '20px', fontSize: '16px' }}
      />
      
      <br />

      {/* ส่วนแสดงผล QR Code จะทำงานเมื่อมีข้อความถูกพิมพ์ลงไป */}
      {text && (
        <div style={{ marginTop: '20px' }}>
          <QRCodeCanvas 
            id="qr-code-canvas" 
            value={text} 
            size={200} 
            level={"H"} // ระดับการแก้ไขข้อผิดพลาด (H = High) ช่วยให้อ่านง่ายแม้ภาพแหว่ง
          />
          <br /><br />
          {/* ปุ่มดาวน์โหลด */}
          <button 
            onClick={handleDownload} 
            style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            ดาวน์โหลดเป็น PNG
          </button>
        </div>
      )}
    </div>
  );
}

export default App;