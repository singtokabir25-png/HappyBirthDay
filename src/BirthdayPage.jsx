import { useState, useEffect, useRef } from "react";

const hearts = ["🤍", "✨", "🌸", "💕", "🌷"];

function FloatingHeart({ emoji, style }) {
  return (
    <div
      style={{
        position: "absolute",
        fontSize: style.size,
        left: style.left,
        opacity: 0,
        animation: `floatUp ${style.duration}s ease-in ${style.delay}s infinite`,
        pointerEvents: "none",
      }}
    >
      {emoji}
    </div>
  );
}

function Confetti({ pieces }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, overflow: "hidden" }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x + "%",
            top: "-20px",
            width: p.size,
            height: p.size * 0.5,
            background: p.color,
            borderRadius: 2,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}

const CONFETTI_COLORS = ["#f9a8c9", "#fcd5a8", "#a8d8f9", "#c9f9a8", "#f9f0a8", "#d4a8f9"];

function makeConfetti() {
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 6 + Math.random() * 8,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 0.8,
    rot: Math.random() * 360,
  }));
}

// ข้อความที่ลอยขึ้นมาแต่ละเทียน
const CANDLE_MESSAGES = ["เค้าขอให้...", "สิ่งที่เธอขอ", "เป็นจริงนะ 🤍"];

function FloatingMessage({ text, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "110%",
        transform: "translateX(-50%)",
        whiteSpace: "nowrap",
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        fontSize: "1rem",
        color: "#c4687e",
        animation: "floatMsg 2.2s ease forwards",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {text}
    </div>
  );
}

function CakeSVG({ blown, onCandleClick, floatingMsg }) {
  // blown = array of 3 booleans
  const candles = [
    { x: 100, idx: 0 },
    { x: 160, idx: 1 },
    { x: 220, idx: 2 },
  ];

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg viewBox="0 0 320 260" width="280" height="215" aria-label="Birthday cake">
        {/* shadow */}
        <ellipse cx="160" cy="230" rx="130" ry="14" fill="#f5c8d8" opacity="0.5" />
        {/* bottom tier */}
        <rect x="40" y="165" width="240" height="65" rx="10" fill="#f9e0ea" />
        <rect x="40" y="165" width="240" height="20" fill="#f4b8d0" />
        {/* middle tier */}
        <rect x="70" y="110" width="180" height="60" rx="8" fill="#fce8f3" />
        <rect x="70" y="110" width="180" height="16" fill="#f4b8d0" />
        {/* top tier */}
        <rect x="95" y="70" width="130" height="45" rx="7" fill="#fff0f7" />
        <rect x="95" y="70" width="130" height="13" fill="#f4b8d0" />
        {/* decorations */}
        <circle cx="80"  cy="195" r="6" fill="#f9a8c9" />
        <circle cx="110" cy="205" r="5" fill="#fcd5a8" />
        <circle cx="240" cy="195" r="6" fill="#f9a8c9" />
        <circle cx="210" cy="207" r="4" fill="#c9f9e8" />
        <circle cx="160" cy="198" r="7" fill="#fce8a8" />
        <text x="148" y="155" fontSize="14" textAnchor="middle" fill="#e8a0b4">♡</text>
        <text x="178" y="148" fontSize="12" textAnchor="middle" fill="#e8a0b4">♡</text>

        {/* candles — clickable */}
        {candles.map((c) => (
          <g
            key={c.idx}
            onClick={() => !blown[c.idx] && onCandleClick(c.idx)}
            style={{ cursor: blown[c.idx] ? "default" : "pointer" }}
          >
            {/* invisible hit area */}
            <rect x={c.x - 14} y="20" width="28" height="60" fill="transparent" />
            {/* candle body */}
            <rect x={c.x - 5} y="42" width="10" height="30" rx="3" fill="#fad4e8" />
            <rect x={c.x - 5} y="42" width="10" height="6"  rx="1" fill="#f9a8c9" />
            {/* wick */}
            <line x1={c.x} y1="42" x2={c.x} y2="36" stroke="#888" strokeWidth="1.5" />

            {/* flame */}
            {!blown[c.idx] ? (
              <g>
                <ellipse cx={c.x} cy="30" rx="5" ry="7" fill="#FFDA6A" opacity="0.9">
                  <animate attributeName="ry" values="7;9;7" dur="0.6s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="30;28;30" dur="0.6s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx={c.x} cy="31" rx="3" ry="4" fill="#FFA040" opacity="0.7">
                  <animate attributeName="ry" values="4;6;4" dur="0.6s" repeatCount="indefinite" />
                </ellipse>
              </g>
            ) : (
              /* smoke */
              <g opacity="0.5">
                <path
                  d={`M${c.x} 34 Q${c.x+4} 26 ${c.x} 20 Q${c.x-4} 14 ${c.x} 8`}
                  stroke="#bbb" strokeWidth="1.5" fill="none" strokeLinecap="round"
                >
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite" />
                </path>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Floating messages — one per candle, positioned above its x */}
      {candles.map((c) =>
        floatingMsg[c.idx] ? (
          <div
            key={c.idx}
            style={{
              position: "absolute",
              /* map SVG x to % of 280px wide container */
              left: `${(c.x / 320) * 100}%`,
              bottom: "80%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: "#c4687e",
              animation: "floatMsg 2.2s ease forwards",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {CANDLE_MESSAGES[c.idx]}
          </div>
        ) : null
      )}
    </div>
  );
}

export default function BirthdayPage() {
  const [isOpen, setIsOpen]       = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  // candle states
  const [blown, setBlown]           = useState([false, false, false]);
  const [floatingMsg, setFloatingMsg] = useState([false, false, false]);
  const [confetti, setConfetti]     = useState([]);
  const [allBlown, setAllBlown]     = useState(false);

  const floatingItems = useRef(
    Array.from({ length: 18 }, () => ({
      emoji: hearts[Math.floor(Math.random() * hearts.length)],
      style: {
        size: `${0.8 + Math.random() * 1.2}rem`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 4,
      },
    }))
  ).current;

  function handleOpenEnvelope() {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => setShowLetter(true), 800);
  }

  function handleCandleClick(idx) {
    // blow out this candle
    const newBlown = [...blown];
    newBlown[idx] = true;
    setBlown(newBlown);

    // show floating message
    const newMsg = [...floatingMsg];
    newMsg[idx] = true;
    setFloatingMsg(newMsg);

    // hide message after 2.2s
    setTimeout(() => {
      setFloatingMsg((prev) => {
        const n = [...prev]; n[idx] = false; return n;
      });
    }, 2200);

    // if all blown → celebrate
    if (newBlown.every(Boolean)) {
      setTimeout(() => {
        setAllBlown(true);
        setConfetti(makeConfetti());
        setTimeout(() => setConfetti([]), 4000);
      }, 600);
    }
  }

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400&display=swap');

      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        background: #FFF8F5;
        font-family: 'Lato', sans-serif;
        color: #5a3e3e;
        overflow-x: hidden;
      }

      @keyframes floatUp {
        0%   { transform: translateY(110vh) scale(0.5); opacity: 0; }
        10%  { opacity: 0.7; }
        90%  { opacity: 0.3; }
        100% { transform: translateY(-10vh) scale(1.1) rotate(20deg); opacity: 0; }
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.4; transform: translateY(0); }
        50%       { opacity: 1;   transform: translateY(4px); }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @keyframes floatMsg {
        0%   { opacity: 0; transform: translateX(-50%) translateY(0px); }
        15%  { opacity: 1; }
        80%  { opacity: 1; }
        100% { opacity: 0; transform: translateX(-50%) translateY(-60px); }
      }

      @keyframes confettiFall {
        0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }

      @keyframes celebPop {
        0%   { opacity: 0; transform: scale(0.7) translateY(16px); }
        60%  { transform: scale(1.05) translateY(-4px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8F5", overflowX: "hidden" }}>

      {confetti.length > 0 && <Confetti pieces={confetti} />}

      {/* ─── HERO ─── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "2rem",
          textAlign: "center",
          background: "linear-gradient(160deg, #FFF0EC 0%, #FFF8F5 50%, #FFF0F5 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          {floatingItems.map((item, i) => (
            <FloatingHeart key={i} emoji={item.emoji} style={item.style} />
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.25em", color: "#c48b9f", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 300 }}>
            June 22
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 8vw, 4rem)", color: "#7a3b4e", lineHeight: 1.2, marginBottom: "0.5rem", fontWeight: 400 }}>
            Happy Birthday,{" "}
            <em style={{ fontStyle: "italic", color: "#c4687e" }}>My Love</em>{" "}🤍
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 3vw, 1.4rem)", color: "#b07a8a", fontStyle: "italic", marginBottom: "2.5rem" }}>
            I'm so grateful to God for bringing you into existence
          </p>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#c48b9f", textTransform: "uppercase", animation: "pulse 2s ease-in-out infinite" }}>
            ↓ scroll ↓
          </p>
        </div>
      </section>

      {/* ─── ENVELOPE ─── */}
      <section style={{ maxWidth: 640, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#c48b9f", textTransform: "uppercase", textAlign: "center", marginBottom: "2rem", fontWeight: 300 }}>
          a letter for you
        </p>
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, #f0c0ce, transparent)", width: "60%", margin: "0 auto 2.5rem" }} />

        {!showLetter && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              onClick={handleOpenEnvelope}
              style={{ width: 300, cursor: isOpen ? "default" : "pointer", userSelect: "none" }}
            >
              <div
                style={{ background: "#fff5f8", border: "1.5px solid #f0c0ce", borderRadius: "4px 4px 12px 12px", height: 180, position: "relative", overflow: "hidden", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={(e) => { if (!isOpen) { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(196,104,126,0.15)"; } }}
                onMouseLeave={(e) => { if (!isOpen) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; } }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, width: 0, height: 0, borderLeft: "150px solid transparent", borderRight: "150px solid transparent", borderTop: "90px solid #fce8ef", transformOrigin: "top center", transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)", transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)", zIndex: 3 }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 32, height: 32, background: "#e8a0b4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, zIndex: 4, opacity: isOpen ? 0 : 1, transition: "opacity 0.3s ease" }}>🤍</div>
                <div style={{ position: "absolute", bottom: 0, left: 12, right: 12, background: "white", borderRadius: "4px 4px 0 0", padding: "12px 16px", fontSize: "0.78rem", lineHeight: 1.8, color: "#7a3b4e", transform: isOpen ? "translateY(-8px)" : "translateY(100%)", transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1) 0.3s", zIndex: 2, border: "0.5px solid #f5d5df" }}>
                  <p>วันนี้คือวันที่พิเศษที่สุดวันหนึ่ง<br />เพราะเธอเกิดมาในโลกนี้...</p>
                </div>
              </div>
            </div>
            {!isOpen && (
              <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#c48b9f", letterSpacing: "0.1em", marginTop: "0.75rem", fontStyle: "italic" }}>
                คลิกที่ซองจดหมายเพื่อเปิด ✉️
              </p>
            )}
          </div>
        )}

        {showLetter && (
          <div style={{ background: "white", border: "1px solid #f0c0ce", borderRadius: 12, padding: "2rem", maxWidth: 500, margin: "0 auto", fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", lineHeight: 2, color: "#7a3b4e", animation: "fadeInUp 0.7s ease both" }}>
            <p style={{ marginBottom: "1rem" }}>My Love,</p>
            <p style={{ marginBottom: "1rem" }}>ในวันเกิดของเธอปีนี้ ขอบอกเธอสักหน่อยนะ ว่าการที่เธอเกิดมาในโลกนี้ทำให้โลกของเค้าสวยงามขึ้นมากเพียงใด</p>
            <p style={{ marginBottom: "1rem" }}>เธอคือคนที่ทำให้เค้ายิ้มได้โดยไม่ต้องพยายาม คือเหตุผลที่ทุกวันดูมีความหมาย และคือความอบอุ่นที่อยู่ในหัวใจ</p>
            <p style={{ marginBottom: "1rem" }}>ขอให้วันนี้เต็มไปด้วยความสุข รอยยิ้ม และทุกสิ่งดีๆ ที่เธอสมควรได้รับ — เพราะเธอสมควรได้รับทุกอย่างที่ดีที่สุด</p>
            <p style={{ textAlign: "right", fontStyle: "italic" }}>ด้วยรัก,<br />คนที่รักเธอที่สุด 🤍</p>
          </div>
        )}
      </section>

      {/* ─── MAKE A WISH ─── */}
      <section style={{ background: "linear-gradient(180deg, #FFF8F5 0%, #FFF0F5 100%)", padding: "3rem 1.5rem 5rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#c48b9f", textTransform: "uppercase", marginBottom: "2rem", fontWeight: 300 }}>
          make a wish
        </p>
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, #f0c0ce, transparent)", width: "60%", margin: "0 auto 2rem" }} />

        {/* hint text */}
        {!allBlown && (
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#b07a8a", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            กดที่เทียนเพื่อเป่าทีละดอก 🕯️
          </p>
        )}

        {/* Cake */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CakeSVG blown={blown} onCandleClick={handleCandleClick} floatingMsg={floatingMsg} />
        </div>

        {/* celebration text */}
        {allBlown && (
          <div style={{ marginTop: "2rem", animation: "celebPop 0.7s cubic-bezier(0.34,1.56,0.64,1) both" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#c4687e", marginBottom: "0.5rem" }}>
              🎉 สุขสันต์วันเกิดนะที่รัก!
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#b07a8a", fontSize: "0.95rem" }}>
              ขอให้คำอธิษฐานของเธอเป็นจริงเสมอ 🤍
            </p>
          </div>
        )}
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ textAlign: "center", padding: "3rem 1.5rem 4rem", background: "#FFF0F5" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#b07a8a", fontSize: "0.95rem" }}>
          🤍 forever & always 🤍
        </p>
      </footer>
    </div>
  );
}