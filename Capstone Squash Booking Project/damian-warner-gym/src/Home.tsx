import React from "react";

export type Page = "home" | "squash" | "bookings";

interface HomeProps {
onNavigate: (page: Page) => void;
currentPage?: Page;
}

const Home: React.FC<HomeProps> = ({ onNavigate, currentPage = "home" }) => {
return (
<div className="app">
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
* { box-sizing: border-box; }
.app {
min-height: 100vh;
background: #10141C;
color: #F5F6F8;
font-family: 'Inter', sans-serif;
-webkit-font-smoothing: antialiased;
}
.nav {
display: flex; align-items: center; justify-content: space-between;
padding: 20px clamp(20px, 5vw, 56px);
border-bottom: 1px solid rgba(255,255,255,0.07);
position: sticky; top: 0;
background: rgba(16,20,28,0.92);
backdrop-filter: blur(6px);
z-index: 10; flex-wrap: wrap; gap: 14px;
}
.brand { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.brand-icon { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #F2B807; position: relative; flex-shrink: 0; }
.brand-icon::after { content: ""; position: absolute; left: 50%; top: 2px; bottom: 2px; width: 2px; background: #F2B807; transform: translateX(-50%); }
.brand-name { font-weight: 700; font-size: 16.5px; letter-spacing: 0.2px; }
.nav-links { display: flex; gap: 6px; }
.nav-link { background: transparent; border: none; color: #A7ADB8; font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 700; letter-spacing: 0.4px; padding: 10px 16px; border-radius: 7px; cursor: pointer; }
.nav-link:hover { color: #F5F6F8; }
.nav-link.active { color: #10141C; background: #F2B807; }
.page { padding: 0 clamp(20px, 5vw, 56px) 80px; max-width: 1180px; margin: 0 auto; }
.eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; color: #F2B807; text-transform: uppercase; margin-bottom: 14px; }
.hero { padding: clamp(44px, 7vw, 84px) 0 8px; max-width: 62ch; }
.hero h1 { font-size: clamp(38px, 5.5vw, 58px); font-weight: 900; line-height: 1.05; letter-spacing: -0.5px; margin: 0 0 20px; }
.hero h1 .gold { color: #F2B807; display: block; }
.hero h1 .white { color: #F5F6F8; display: block; }
.hero p.sub { font-size: 16px; color: #9AA1AC; line-height: 1.65; margin-bottom: 28px; max-width: 50ch; }
.btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
.btn-gold, .btn-outline { font-weight: 700; font-size: 13.5px; letter-spacing: 0.4px; padding: 14px 24px; border-radius: 7px; cursor: pointer; text-transform: uppercase; }
.btn-gold { background: #F2B807; color: #10141C; border: none; }
.btn-gold:hover { background: #FFC824; }
.btn-outline { background: transparent; color: #F5F6F8; border: 1px solid rgba(255,255,255,0.2); }
.btn-outline:hover { border-color: #F2B807; }
.status-bar { display: flex; align-items: center; gap: 12px; margin-bottom: 56px; }
.status-track { flex: 1; height: 2px; background: rgba(255,255,255,0.15); position: relative; }
.status-track::before { content:""; position:absolute; left:0; top:-3px; width:8px; height:8px; border-radius:50%; background:#3FCF6E; }
.status-text { font-size: 13px; color: #9AA1AC; white-space: nowrap; }
.info-grid { display: grid; gap: 16px; margin-top: 24px; }
.info-card { background: #161B26; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 22px 24px; }
.info-card .k { font-size: 12px; font-weight: 700; letter-spacing: 1.2px; color: #F2B807; text-transform: uppercase; margin-bottom: 8px; }
.info-card .v { font-size: 19px; font-weight: 700; margin-bottom: 4px; }
.info-card .d { font-size: 14px; color: #9AA1AC; }
`}</style>

<nav className="nav">
<div className="brand" onClick={() => onNavigate("home")}>
<span className="brand-icon" />
<span className="brand-name">Damian Warner Gym</span>
</div>
<div className="nav-links">
{(["home", "squash", "bookings"] as Page[]).map((p) => (
<button
key={p}
className={`nav-link ${currentPage === p ? "active" : ""}`}
onClick={() => onNavigate(p)}
>
{p.toUpperCase()}
</button>
))}
</div>
</nav>

<div className="page">
<div className="hero">
<div className="eyebrow">London, Ontario · Est. Local Racquet Club</div>
<h1>
<span className="white">BOOK YOUR COURT.</span>
<span className="gold">PLAY TODAY.</span>
</h1>
<p className="sub">
Four squash courts, open 5 AM – 11 PM daily. Reserve in under a
minute — members and guests welcome.
</p>
<div className="btn-row">
<button className="btn-gold" onClick={() => onNavigate("bookings")}>Book a Court</button>
<button className="btn-outline" onClick={() => onNavigate("squash")}>View Hours</button>
</div>
<div className="status-bar">
<div className="status-track" />
<div className="status-text">Court 02 · Available</div>
</div>
</div>

<div>
<div className="eyebrow">Home</div>
<h2 style={{ fontSize: "26px", fontWeight: 900, margin: 0 }}>GYM INFORMATION</h2>
</div>

<div className="info-grid">
<div className="info-card">
<div className="k">Location</div>
<div className="v">755 Wonderland Rd</div>
<div className="d">London, Ontario N6H 4L1</div>
</div>
<div className="info-card">
<div className="k">Hours</div>
<div className="v">5:00 AM – 11:00 PM</div>
<div className="d">Open 7 days a week, including holidays</div>
</div>
<div className="info-card">
<div className="k">General Manager</div>
<div className="v">Brody Mcvittie</div>
<div className="d">On-site Mon–Fri, 9 AM – 5 PM</div>
</div>
</div>
</div>
</div>
);
};

export default Home;

