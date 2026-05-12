import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function App() {
  // สร้าง State สำหรับเก็บค่าต่างๆ ที่ User เลือก
  const [text, setText] = useState('');
  const [fgColor, setFgColor] = useState('#000000'); // สีของตัว QR Code (ค่าเริ่มต้นสีดำ)
  const [bgColor, setBgColor] = useState('#ffffff'); // สีพื้นหลัง (ค่าเริ่มต้นสีขาว)
  const [logo, setLogo] = useState(null); // ไฟล์รูปโลโก้
  const [qrSize, setQrSize] = useState(256); // ขนาดรูปภาพตอนดาวน์โหลด (ค่าเริ่มต้น 256px)

  // ฟังก์ชันสำหรับจัดการตอนที่ User อัปโหลดไฟล์รูปโลโก้
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      // แปลงไฟล์รูปภาพให้อยู่ในรูปแบบ Data URL เพื่อเอาไปแสดงบนเว็บ
      reader.onload = (event) => {
        setLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ฟังก์ชันสำหรับดาวน์โหลดภาพ
  const handleDownload = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `custom-qrcode-${qrSize}px.png`;
      downloadLink.click();
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #ccb314 0%, #9f2dc5 50%, #3d0855 100%)', minHeight: '100vh', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', padding: '40px 18px' }}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>✨ สร้าง QR Code</h1>
      
      {/* --- ส่วนเครื่องมือตั้งค่า (Control Panel) --- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', padding: '20px', background: '#010c1d71', borderRadius: '12px', border: '5px solid #ffffff', color: 'white' }}>
        
        <div>
          <label><b>1. ข้อความหรือลิงก์ URL:</b></label><br/>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="ใส่ข้อมูลที่นี่..." 
            style={{ width: '95%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div>
            <label><b>2. สี QR Code:</b></label><br/>
            <input 
              type="color" 
              value={fgColor} 
              onChange={(e) => setFgColor(e.target.value)} 
              style={{ marginTop: '10px', cursor: 'pointer' }} 
            />
          </div>
          <div>
            <label><b>3. สีพื้นหลัง:</b></label><br/>
            <input 
              type="color" 
              value={bgColor} 
              onChange={(e) => setBgColor(e.target.value)} 
              style={{ marginTop: '10px', cursor: 'pointer' }} 
            />
          </div>
        </div>

        <div>
          <label><b>4. อัปโหลดโลโก้ (แทรกตรงกลาง):</b></label><br/>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleLogoUpload} 
            style={{ marginTop: '5px' }} 
          />
          {logo && (
            <button onClick={() => setLogo(null)} style={{ marginLeft: '10px', color: 'red', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}>
              ลบโลโก้
            </button>
          )}
        </div>

        <div>
          <label><b>5. ความละเอียดภาพก่อนดาวน์โหลด:</b></label><br/>
          <select 
            value={qrSize} 
            onChange={(e) => setQrSize(Number(e.target.value))} 
            style={{ padding: '8px', marginTop: '5px', borderRadius: '6px' }}
          >
            <option value={256}>เล็ก (256 x 256 px)</option>
            <option value={512}>กลาง (512 x 512 px)</option>
            <option value={1024}>ใหญ่ (1024 x 1024 px)</option>
          </select>
        </div>

      </div>

      {/* --- ส่วนแสดงผล QR Code แบบ Real-time --- */}
      {text && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'white' }}>👀 ดูพรีวิว:</h3>
          {/* กรอบล้อมรอบ QR Code */}
          <div style={{ display: 'inline-block', padding: '15px', background: bgColor, borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
            <QRCodeCanvas 
              id="qr-code-canvas" 
              value={text} 
              size={qrSize} // ขนาดภาพจริงที่จะถูกเรนเดอร์ลง Canvas
              fgColor={fgColor} // สี QR
              bgColor={bgColor} // สีพื้นหลัง
              level={"H"} // ระดับการแก้ไขข้อผิดพลาดระดับสูงสุด (H) เพื่อให้ใส่โลโก้แล้วยังสแกนติด
              imageSettings={logo ? {
                src: logo,
                height: qrSize * 0.22, // ปรับให้โลโก้มีขนาดประมาณ 22% ของภาพรวม
                width: qrSize * 0.22,
                excavate: true, // เจาะพื้นหลังตรงรูปโลโก้ให้โล่ง เพื่อความสวยงาม
              } : undefined}
              style={{ width: '100%', maxWidth: '256px', height: 'auto' }} // CSS บังคับให้หน้าพรีวิวบนเว็บดูเล็ก ไม่ล้นจอ แต่ตอนโหลดจะได้ภาพใหญ่ตามปกติ
            />
          </div>
          
          <br /><br />
          
          {/* ปุ่มดาวน์โหลด */}
          <button 
            onClick={handleDownload} 
            style={{ padding: '12px 24px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,123,255,0.3)' }}
          >
            ดาวน์โหลดภาพ ({qrSize}px)
          </button>
        </div>
      )}
    </div>
  );
}

export default App;