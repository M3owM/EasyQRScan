import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const getStyles = (isDark) => `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    background: ${isDark ? '#0d0618' : '#f3eeff'};
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.35s ease;
  }

  .qr-app {
    min-height: 100vh;
    background: ${isDark ? '#0d0618' : '#f3eeff'};
    background-image: ${isDark
      ? `radial-gradient(ellipse 80% 50% at 20% -20%, rgba(139,92,246,0.25) 0%, transparent 60%),
         radial-gradient(ellipse 60% 40% at 80% 110%, rgba(234,179,8,0.12) 0%, transparent 55%)`
      : `radial-gradient(ellipse 80% 50% at 20% -10%, rgba(168,85,247,0.12) 0%, transparent 55%),
         radial-gradient(ellipse 60% 40% at 80% 100%, rgba(234,179,8,0.1) 0%, transparent 55%)`};
    padding: 40px 20px 60px;
    color: ${isDark ? '#f0e8ff' : '#2d1a4a'};
    transition: background 0.35s ease, color 0.35s ease;
  }

  .theme-toggle-wrap {
    max-width: 1000px;
    margin: 0 auto 24px;
    display: flex;
    justify-content: flex-end;
  }

  .theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px 8px 10px;
    border-radius: 50px;
    border: 1.5px solid ${isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.25)'};
    background: ${isDark ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.8)'};
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: ${isDark ? 'rgba(220,200,255,0.8)' : 'rgba(100,60,160,0.9)'};
    box-shadow: ${isDark ? 'none' : '0 2px 10px rgba(139,92,246,0.1)'};
  }

  .theme-toggle-btn:hover {
    background: ${isDark ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,1)'};
    border-color: rgba(168,85,247,0.5);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(139,92,246,0.18);
  }

  .theme-toggle-track {
    width: 40px;
    height: 22px;
    border-radius: 11px;
    position: relative;
    transition: background 0.3s, box-shadow 0.3s, border-color 0.3s;
    background: ${isDark ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'rgba(180,160,220,0.3)'};
    border: 1.5px solid ${isDark ? '#a855f7' : 'rgba(139,92,246,0.2)'};
    box-shadow: ${isDark ? '0 0 10px rgba(168,85,247,0.4)' : 'none'};
    flex-shrink: 0;
  }

  .theme-toggle-knob {
    position: absolute;
    top: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
    transition: transform 0.28s cubic-bezier(.4,0,.2,1);
    transform: ${isDark ? 'translateX(17px)' : 'translateX(1px)'};
  }

  .qr-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .qr-header h1 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 3.2rem);
    letter-spacing: -0.03em;
    line-height: 1.1;
    background: linear-gradient(135deg, #fde047 0%, #f59e0b 30%, #c084fc 65%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .qr-header p {
    color: ${isDark ? 'rgba(200,180,240,0.6)' : 'rgba(100,70,150,0.6)'};
    font-size: 0.95rem;
    margin-top: 10px;
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  .qr-layout {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  @media (max-width: 720px) {
    .qr-layout { grid-template-columns: 1fr; }
  }

  .card {
    background: ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)'};
    border: 1px solid ${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(139,92,246,0.15)'};
    border-radius: 20px;
    padding: 28px;
    backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
    box-shadow: ${isDark ? 'none' : '0 4px 24px rgba(139,92,246,0.08), 0 1px 4px rgba(0,0,0,0.04)'};
    transition: background 0.35s, border-color 0.35s, box-shadow 0.35s;
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${isDark
      ? 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, transparent 60%)'
      : 'linear-gradient(135deg, rgba(168,85,247,0.04) 0%, transparent 60%)'};
    pointer-events: none;
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${isDark ? 'rgba(220,200,255, 0.75)' : 'rgba(17, 1, 42, 0.75)'};
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(139,92,246,0.12)'};
  }

  .field-label {
    display: block;
    font-size: 0.82rem;
    font-weight: 500;
    color: ${isDark ? 'rgba(220,200,255,0.75)' : 'rgba(80,40,130,0.8)'};
    margin-bottom: 8px;
    letter-spacing: 0.01em;
  }

  .field-group { margin-bottom: 20px; }
  .field-group:last-child { margin-bottom: 0; }

  .text-input {
    width: 100%;
    padding: 13px 16px;
    border-radius: 12px;
    border: 1.5px solid ${isDark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.22)'};
    background: ${isDark ? 'rgba(13,6,24,0.6)' : 'rgba(248,244,255,0.9)'};
    color: ${isDark ? '#f0e8ff' : '#2d1a4a'};
    font-family: 'DM Sans', sans-serif;
    font-size: 0.93rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.35s, color 0.35s;
  }

  .text-input::placeholder {
    color: ${isDark ? 'rgba(180,160,220,0.35)' : 'rgba(120,90,170,0.35)'};
  }

  .text-input:focus {
    border-color: rgba(168,85,247,0.7);
    box-shadow: 0 0 0 3px rgba(139,92,246,0.12), 0 0 20px rgba(139,92,246,0.08);
  }

  .toggle-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: ${isDark ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.05)'};
    border: 1px solid ${isDark ? 'rgba(139,92,246,0.18)' : 'rgba(139,92,246,0.15)'};
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    user-select: none;
  }

  .toggle-row:hover {
    background: ${isDark ? 'rgba(139,92,246,0.14)' : 'rgba(139,92,246,0.1)'};
    border-color: rgba(139,92,246,0.3);
  }

  .toggle-switch {
    width: 42px;
    height: 24px;
    border-radius: 12px;
    background: ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(139,92,246,0.15)'};
    border: 1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(139,92,246,0.2)'};
    position: relative;
    transition: background 0.25s, border-color 0.25s;
    flex-shrink: 0;
  }

  .toggle-switch.on {
    background: linear-gradient(135deg, #a855f7, #7c3aed);
    border-color: #a855f7;
    box-shadow: 0 0 12px rgba(168,85,247,0.4);
  }

  .toggle-knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    transition: transform 0.25s cubic-bezier(.4,0,.2,1);
  }

  .toggle-switch.on .toggle-knob { transform: translateX(18px); }

  .toggle-text {
    font-size: 0.87rem;
    font-weight: 500;
    color: ${isDark ? 'rgba(220,200,255,0.85)' : 'rgba(80,40,130,0.85)'};
    flex: 1;
  }

  .toggle-badge {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding: 3px 8px;
    border-radius: 6px;
    background: rgba(253,224,71,0.12);
    color: ${isDark ? '#fde047' : '#b45309'};
    border: 1px solid rgba(234,179,8,0.25);
  }

  .btn-generate {
    width: 100%;
    padding: 15px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
    color: white;
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 4px 20px rgba(139,92,246,0.4), 0 1px 0 rgba(255,255,255,0.1) inset;
  }

  .btn-generate::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
  }

  .btn-generate:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(139,92,246,0.55), 0 1px 0 rgba(255,255,255,0.1) inset;
  }

  .btn-generate:active:not(:disabled) { transform: translateY(0); }
  .btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-loading { background: rgba(139,92,246,0.3) !important; box-shadow: none !important; }

  .short-url-box {
    padding: 14px 16px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.25);
    border-radius: 12px;
    margin-top: 14px;
  }

  .short-url-box .label {
    font-size: 0.76rem;
    font-weight: 600;
    color: #86efac;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .short-url-box a {
    color: ${isDark ? '#d1fae5' : '#166534'};
    font-size: 0.9rem;
    text-decoration: none;
    word-break: break-all;
  }

  .short-url-box a:hover { text-decoration: underline; }

  .color-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .color-field { display: flex; flex-direction: column; gap: 8px; }

  .color-swatch-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: ${isDark ? 'rgba(13,6,24,0.5)' : 'rgba(248,244,255,0.9)'};
    border: 1.5px solid ${isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.18)'};
    border-radius: 12px;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .color-swatch-wrap:hover { border-color: rgba(168,85,247,0.5); }

  .color-swatch {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 2px solid rgba(255,255,255,0.15);
    flex-shrink: 0;
  }

  .color-hex {
    font-size: 0.82rem;
    color: ${isDark ? 'rgba(200,180,240,0.7)' : 'rgba(80,50,130,0.7)'};
    letter-spacing: 0.03em;
  }

  .color-input-hidden { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }

  .upload-area {
    border: 1.5px dashed ${isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.25)'};
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    background: ${isDark ? 'rgba(139,92,246,0.04)' : 'rgba(139,92,246,0.03)'};
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    position: relative;
  }

  .upload-area:hover {
    border-color: rgba(168,85,247,0.55);
    background: ${isDark ? 'rgba(139,92,246,0.09)' : 'rgba(139,92,246,0.06)'};
  }

  .upload-area input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .upload-icon { font-size: 1.6rem; margin-bottom: 6px; }

  .upload-text {
    font-size: 0.82rem;
    color: ${isDark ? 'rgba(200,180,240,0.55)' : 'rgba(100,60,160,0.55)'};
  }

  .upload-text strong { color: ${isDark ? 'rgba(192,132,252,0.9)' : '#7c3aed'}; }

  .logo-preview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: ${isDark ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.07)'};
    border: 1px solid ${isDark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.2)'};
    border-radius: 12px;
  }

  .logo-preview-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    color: ${isDark ? 'rgba(220,200,255,0.8)' : 'rgba(80,40,130,0.8)'};
  }

  .logo-thumb { width: 36px; height: 36px; object-fit: contain; border-radius: 8px; background: rgba(255,255,255,0.08); padding: 3px; }

  .btn-remove {
    background: none;
    border: 1px solid rgba(248,113,113,0.3);
    color: ${isDark ? '#fca5a5' : '#dc2626'};
    border-radius: 8px;
    padding: 5px 12px;
    font-size: 0.78rem;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .btn-remove:hover { background: rgba(248,113,113,0.12); border-color: rgba(248,113,113,0.55); }

  .size-tabs { display: flex; gap: 8px; }

  .size-tab {
    flex: 1;
    padding: 10px 6px;
    border-radius: 10px;
    border: 1.5px solid ${isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.18)'};
    background: ${isDark ? 'rgba(139,92,246,0.05)' : 'rgba(139,92,246,0.04)'};
    color: ${isDark ? 'rgba(200,180,240,0.6)' : 'rgba(100,60,160,0.6)'};
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
    transition: all 0.18s;
  }

  .size-tab:hover {
    border-color: rgba(168,85,247,0.45);
    color: ${isDark ? 'rgba(220,200,255,0.9)' : 'rgba(80,30,140,0.9)'};
  }

  .size-tab.active {
    background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2));
    border-color: rgba(168,85,247,0.7);
    color: ${isDark ? '#e9d5ff' : '#6d28d9'};
    font-weight: 600;
    box-shadow: 0 0 12px rgba(139,92,246,0.2);
  }

  .size-tab .size-label { display: block; font-size: 0.72rem; opacity: 0.7; margin-top: 2px; }

  .preview-panel { position: sticky; top: 20px; }

  .preview-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    gap: 16px;
  }

  .preview-empty-icon {
    width: 72px;
    height: 72px;
    background: ${isDark ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.07)'};
    border: 1.5px dashed ${isDark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.2)'};
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  .preview-empty-text {
    text-align: center;
    color: ${isDark ? 'rgba(200,180,240,0.4)' : 'rgba(100,60,160,0.45)'};
    font-size: 0.88rem;
    line-height: 1.6;
  }

  .preview-qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .qr-frame {
    padding: 20px;
    border-radius: 20px;
    box-shadow: ${isDark
      ? '0 0 0 1px rgba(255,255,255,0.07), 0 20px 60px rgba(0,0,0,0.5)'
      : '0 0 0 1px rgba(139,92,246,0.1), 0 12px 40px rgba(139,92,246,0.12)'};
    display: inline-block;
    transition: box-shadow 0.35s;
  }

  .qr-frame canvas {
    display: block;
    border-radius: 8px;
    max-width: 220px !important;
    width: 100% !important;
    height: auto !important;
  }

  .btn-download {
    width: 100%;
    padding: 14px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #ca8a04 0%, #eab308 40%, #fde047 100%);
    color: #1a0f00;
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(234,179,8,0.35);
  }

  .btn-download:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(234,179,8,0.5); }
  .btn-download:active { transform: translateY(0); }

  .download-sub {
    font-size: 0.72rem;
    color: ${isDark ? 'rgba(200,180,240,0.4)' : 'rgba(100,60,160,0.45)'};
    text-align: center;
    margin-top: -8px;
    letter-spacing: 0.03em;
  }

  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.25);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [text, setText] = useState('');
  const [isShortenEnabled, setIsShortenEnabled] = useState(false);
  const [finalQrValue, setFinalQrValue] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fgColor, setFgColor] = useState('#1a0a2e');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logo, setLogo] = useState(null);
  const [qrSize, setQrSize] = useState(512);

  const handleTextChange = (e) => {
    setText(e.target.value);
    setFinalQrValue('');
    setShortUrl('');
  };

  const handleGenerateQR = async () => {
    if (!text) return;
    if (isShortenEnabled) {
      if (!text.startsWith('http://') && !text.startsWith('https://')) {
        alert('กรุณาใส่ลิงก์ที่ขึ้นต้นด้วย http:// หรือ https:// เพื่อทำการย่อลิงก์');
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(text)}`);
        const data = await response.json();
        if (data.shorturl) {
          setShortUrl(data.shorturl);
          setFinalQrValue(data.shorturl);
        } else {
          alert('ไม่สามารถย่อลิงก์ได้ ลองตรวจสอบความถูกต้องของ URL อีกครั้ง');
        }
      } catch (error) {
        console.error('Error shortening URL:', error);
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อ API');
      } finally {
        setIsLoading(false);
      }
    } else {
      setShortUrl('');
      setFinalQrValue(text);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `qrcode-${qrSize}px.png`;
      a.click();
    }
  };

  const sizeOptions = [
    { value: 256, label: 'S', sub: '256 px' },
    { value: 512, label: 'M', sub: '512 px' },
    { value: 1024, label: 'L', sub: '1024 px' },
  ];

  return (
    <>
      <style>{getStyles(isDark)}</style>
      <div className="qr-app">

        {/* ── THEME TOGGLE ── */}
        <div className="theme-toggle-wrap">
          <button
            className="theme-toggle-btn"
            onClick={() => setIsDark(v => !v)}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span style={{ fontSize: '1rem' }}>{isDark ? '🌙' : '☀️'}</span>
            <div className="theme-toggle-track">
              <div className="theme-toggle-knob" />
            </div>
            <span>{isDark ? 'Dark' : 'Light'}</span>
          </button>
        </div>

        {/* ── HEADER ── */}
        <div className="qr-header">
          <h1>QR Code Generator</h1>
          <p>สร้าง QR Code ได้ทันที · ปรับแต่งสี · ใส่โลโก้ · ย่อลิงก์</p>
        </div>

        {/* ── LAYOUT ── */}
        <div className="qr-layout">

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div className="card">
              <div className="card-title">01 · ข้อมูล</div>
              <div className="field-group">
                <label className="field-label">ข้อความ หรือ URL</label>
                <input
                  className="text-input"
                  type="text"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="https://example.com หรือข้อความใดก็ได้..."
                />
              </div>
              <div className="field-group">
                <label
                  className="toggle-row"
                  onClick={() => { setIsShortenEnabled(v => !v); setFinalQrValue(''); }}
                >
                  <div className={`toggle-switch ${isShortenEnabled ? 'on' : ''}`}>
                    <div className="toggle-knob" />
                  </div>
                  <span className="toggle-text">ย่อลิงก์อัตโนมัติ</span>
                  <span className="toggle-badge">is.gd</span>
                </label>
              </div>
              <button
                className={`btn-generate ${isLoading ? 'btn-loading' : ''}`}
                onClick={handleGenerateQR}
                disabled={isLoading || !text}
              >
                {isLoading ? <><span className="spinner" />กำลังประมวลผล...</> : '✦ สร้าง QR Code'}
              </button>
              {shortUrl && (
                <div className="short-url-box">
                  <div className="label">✓ ลิงก์สั้นพร้อมใช้งาน</div>
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-title">02 · สี</div>
              <div className="color-grid">
                <div className="color-field">
                  <label className="field-label">สี QR Code</label>
                  <label className="color-swatch-wrap">
                    <div className="color-swatch" style={{ background: fgColor }} />
                    <span className="color-hex">{fgColor.toUpperCase()}</span>
                    <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="color-input-hidden" />
                  </label>
                </div>
                <div className="color-field">
                  <label className="field-label">สีพื้นหลัง</label>
                  <label className="color-swatch-wrap">
                    <div className="color-swatch" style={{ background: bgColor, border: '2px solid rgba(139,92,246,0.2)' }} />
                    <span className="color-hex">{bgColor.toUpperCase()}</span>
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="color-input-hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">03 · โลโก้</div>
              {logo ? (
                <div className="logo-preview">
                  <div className="logo-preview-info">
                    <img src={logo} alt="logo" className="logo-thumb" />
                    <span>โลโก้พร้อมใช้งาน</span>
                  </div>
                  <button className="btn-remove" onClick={() => setLogo(null)}>ลบออก</button>
                </div>
              ) : (
                <div className="upload-area">
                  <input type="file" accept="image/*" onChange={handleLogoUpload} />
                  <div className="upload-icon">🖼</div>
                  <div className="upload-text">
                    <strong>คลิกเพื่อเลือกไฟล์</strong><br />
                    หรือลากมาวางที่นี่ · PNG, JPG, SVG
                  </div>
                </div>
              )}
            </div>

            <div className="card">
              <div className="card-title">04 · ความละเอียด</div>
              <div className="size-tabs">
                {sizeOptions.map(opt => (
                  <button
                    key={opt.value}
                    className={`size-tab ${qrSize === opt.value ? 'active' : ''}`}
                    onClick={() => setQrSize(opt.value)}
                  >
                    <span style={{ fontSize: '1.1rem', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{opt.label}</span>
                    <span className="size-label">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="preview-panel">
            <div className="card" style={{ minHeight: '420px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="card-title">05 · พรีวิว</div>
              {!finalQrValue ? (
                <div className="preview-empty">
                  <div className="preview-empty-icon">◻</div>
                  <div className="preview-empty-text">
                    ใส่ข้อมูลแล้วกด<br />
                    <strong style={{ color: isDark ? 'rgba(192,132,252,0.8)' : '#7c3aed' }}>✦ สร้าง QR Code</strong><br />
                    เพื่อดูตัวอย่าง
                  </div>
                </div>
              ) : (
                <div className="preview-qr">
                  <div className="qr-frame" style={{ background: bgColor }}>
                    <QRCodeCanvas
                      id="qr-code-canvas"
                      value={finalQrValue}
                      size={qrSize}
                      fgColor={fgColor}
                      bgColor={bgColor}
                      level="H"
                      imageSettings={logo ? { src: logo, height: qrSize * 0.22, width: qrSize * 0.22, excavate: true } : undefined}
                    />
                  </div>
                  <div style={{ width: '100%' }}>
                    <button className="btn-download" onClick={handleDownload}>↓ ดาวน์โหลด PNG</button>
                    <div className="download-sub" style={{ marginTop: '8px' }}>
                      ขนาด {qrSize} × {qrSize} px · High Error Correction
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
