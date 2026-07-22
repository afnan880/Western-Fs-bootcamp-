import React from "react";

export type Page = "home" | "squash" | "bookings";

interface SquashProps {
onNavigate: (page: Page) => void;
currentPage?: Page;
}

interface Rule {
idx: string;
title: string;
description: string;
}

const RULES: Rule[] = [
{
idx: "01",
title: "The Basics",
description:
"Two players take turns hitting a small rubber ball against the front wall, using the side and back walls in play.",
},
{
idx: "02",
title: "Scoring",
description: "Matches are typically best-of-five games, each played to 11 points, win by 2.",
},
{
idx: "03",
title: "Equipment",
description: "Bring your own racquet or rent one at the front desk. Non-marking court shoes are required.",
},
{
idx: "04",
title: "Court Booking",
description: "Courts are booked in 1-hour slots, up to 2 players per court, from 5 AM to 11 PM daily.",
},
];

const Squash: React.FC<SquashProps> = ({ onNavigate, currentPage = "squash" }) => {
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
.squash-head { padding: 44px 0 0; max-width: 68ch; }
.squash-head h1 { font-size: clamp(30px, 4.5vw, 42px); font-weight: 900; margin: 0; letter-spacing: -0.3px; }
.rep-card { background: #161B26; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 28px; margin-top: 28px; }
.avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #3a4a3f, #F2B807 130%); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; color: #F5F6F8; margin-bottom: 18px; }
.rep-card .role { font-size: 12px; font-weight: 700; letter-spacing: 1px; color: #F2B807; text-transform: uppercase; margin-bottom: 6px; }
.rep-card .name { font-size: 21px; font-weight: 800; margin-bottom: 12px; }
.rep-card .desc { font-size: 14.5px; color: #9AA1AC; line-height: 1.7; }
.rule-list { margin-top: 20px; }
.rule-item { background: #161B26; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 22px 24px; margin-bottom: 12px; }
.rule-item .idx { font-size: 12px; font-weight: 700; color: #F2B807; letter-spacing: 1px; margin-bottom: 8px; }
.rule-item .t { font-size: 17px; font-weight: 700; margin-bottom: 6px; }
.rule-item .d { font-size: 14px; color: #9AA1AC; line-height: 1.6; }
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
<div className="squash-head">
<div className="eyebrow">Squash</div>
<h1>ABOUT THE GAME &amp; YOUR REP</h1>
</div>

<div className="rep-card">
<div className="avatar">AM</div>
<div className="role">Squash Program Representative</div>
<div className="name">Coach Afnan Mudassar</div>
<div className="desc">
Squash is a fast-paced racquet sport played in an enclosed four-wall
court. Afnan runs beginner clinics every Saturday and is available
for private lessons — ask at the front desk or book a court to get
started.
</div>
</div>

<div className="rule-list">
{RULES.map((rule) => (
<div className="rule-item" key={rule.idx}>
<div className="idx">{rule.idx}</div>
<div className="t">{rule.title}</div>
<div className="d">{rule.description}</div>
</div>
))}
</div>
</div>
</div>
);
};

export default Squash;