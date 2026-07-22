import React, { useState, useMemo } from "react";
import { Calendar, Clock, Users, Check } from "lucide-react";

export type Page = "home" | "squash" | "bookings";

interface BookingsProps {
onNavigate: (page: Page) => void;
currentPage?: Page;
}

export interface BookingPayload {
court_id: number;
booking_date: string; // YYYY-MM-DD
start_time: string; // HH:MM:SS
num_players: 1 | 2;
is_member: boolean;
guardian_required: "Y" | "N";
member_id: string | null;
guest_name: string | null;
guest_contact: string | null;
}

const COURTS: number[] = [1, 2, 3];
const HOURS: number[] = Array.from({ length: 18 }, (_, i) => 5 + i); // 5am..10pm start times

function formatHour(h: number): string {
const period = h < 12 ? "AM" : "PM";
const display = h % 12 === 0 ? 12 : h % 12;
return `${display}:00 ${period}`;
}

function todayLabel(): string {
const d = new Date();
return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function todayISO(): string {
return new Date().toISOString().slice(0, 10);
}

const Bookings: React.FC<BookingsProps> = ({ onNavigate, currentPage = "bookings" }) => {
const [court, setCourt] = useState<number>(1);
const [date] = useState<string>(todayISO());
const [hour, setHour] = useState<number | null>(null);
const [numPlayers, setNumPlayers] = useState<1 | 2>(1);
const [guardianRequired, setGuardianRequired] = useState<boolean>(false);
const [isMember, setIsMember] = useState<boolean>(true);
const [name, setName] = useState<string>("");
const [contact, setContact] = useState<string>("");
const [bookedSlots, setBookedSlots] = useState<Record<string, boolean>>({
"1-7": true,
"1-10": true,
"1-21": true,
});
const [confirmed, setConfirmed] = useState<BookingPayload | null>(null);
const [error, setError] = useState<string>("");

const key = (c: number, h: number): string => `${c}-${h}`;

const canSubmit = useMemo<boolean>(() => {
if (hour === null) return false;
if (!name.trim()) return false;
if (!isMember && !contact.trim()) return false;
return true;
}, [hour, name, isMember, contact]);

async function submit(): Promise<void> {
setError("");
 if (hour === null) return;
if (bookedSlots[key(court, hour)]) {
      setError("This slot is already booked. Pick another time.");
      return;
    }
    const booking: BookingPayload = {
      court_id: court,
      booking_date: date,
      start_time: `${String(hour).padStart(2, "0")}:00:00`,
      num_players: numPlayers,
      is_member: isMember,
      guardian_required: guardianRequired ? "Y" : "N",
      member_id: isMember ? name : null,
      guest_name: isMember ? null : name,
      guest_contact: isMember ? null : contact,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Booking failed.");
        return;
      }
      setBookedSlots({ ...bookedSlots, [key(court, hour)]: true });
      setConfirmed(booking);
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    }
  }

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
.book-head { padding: 44px 0 0; }
.book-head h1 { font-size: clamp(30px, 4.5vw, 42px); font-weight: 900; margin: 0 0 24px; letter-spacing: -0.3px; }
.court-tabs { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.court-tab { background: #161B26; border: 1px solid rgba(255,255,255,0.08); color: #F5F6F8; font-weight: 700; font-size: 14px; padding: 11px 20px; border-radius: 8px; cursor: pointer; }
.court-tab.active { background: #F2B807; color: #10141C; border-color: #F2B807; }
.meta-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }
.meta-pill { display: flex; align-items: center; gap: 7px; background: #161B26; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 9px 16px; font-size: 13px; color: #C7CCD3; }
.meta-pill b { color: #F5F6F8; font-weight: 700; }
.slot-list { border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden; margin-bottom: 16px; }
.slot-row { padding: 16px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06); cursor: pointer; background: #161B26; }
.slot-row:last-child { border-bottom: none; }
.slot-row .time { font-size: 15.5px; font-weight: 700; color: #F5F6F8; }
.slot-row .status { font-size: 12px; color: #7C838F; margin-top: 2px; }
.slot-row.selected { background: #F2B807; }
.slot-row.selected .time, .slot-row.selected .status { color: #10141C; }
.slot-row.taken { cursor: not-allowed; }
.slot-row.taken .time { color: #565C66; text-decoration: line-through; }
.slot-row.taken .status { color: #565C66; }
.legend { display: flex; gap: 22px; flex-wrap: wrap; font-size: 13px; color: #9AA1AC; margin-bottom: 32px; }
.legend span { display: inline-flex; align-items: center; gap: 7px; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.dot.avail { border: 1px solid #7C838F; }
.dot.taken { background: #565C66; }
.dot.sel { background: #F2B807; }
.form-card { background: #161B26; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 26px; }
.field-label { font-size: 12px; font-weight: 700; letter-spacing: 1px; color: #9AA1AC; text-transform: uppercase; margin-bottom: 10px; }
.field-label:not(:first-child) { margin-top: 20px; }
.toggle-row { display: flex; gap: 8px; }
.toggle-btn { flex: 1; background: #10141C; border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; padding: 12px; color: #C7CCD3; cursor: pointer; font-size: 13.5px; font-weight: 600; }
.toggle-btn.sel { background: #F2B807; border-color: #F2B807; color: #10141C; font-weight: 700; }
input[type="text"], input[type="tel"] { width: 100%; background: #10141C; border: 1px solid rgba(255,255,255,0.12); color: #F5F6F8; padding: 12px 14px; border-radius: 7px; font-family: 'Inter', sans-serif; font-size: 14.5px; }
input:focus { outline: 2px solid #F2B807; outline-offset: 1px; }
.btn-gold, .btn-outline { font-weight: 700; font-size: 13.5px; letter-spacing: 0.4px; padding: 14px 24px; border-radius: 7px; cursor: pointer; text-transform: uppercase; }
.btn-gold { background: #F2B807; color: #10141C; border: none; }
.btn-gold:hover { background: #FFC824; }
.btn-gold:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-outline { background: transparent; color: #F5F6F8; border: 1px solid rgba(255,255,255,0.2); }
.btn-outline:hover { border-color: #F2B807; }
.error-box { background: rgba(210,70,60,0.12); border: 1px solid #D2463C; color: #F0A8A2; padding: 12px 14px; border-radius: 7px; font-size: 13.5px; margin-top: 18px; }
.confirm-box { background: rgba(242,184,7,0.1); border: 1px solid #F2B807; border-radius: 10px; padding: 22px; margin-top: 18px; }
.confirm-box h4 { font-size: 18px; font-weight: 800; margin: 0 0 8px; display: flex; align-items: center; gap: 8px; }
.confirm-box p { font-size: 13.5px; color: #C7CCD3; margin: 0 0 14px; }
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
<div className="book-head">
<div className="eyebrow">Bookings</div>
<h1>RESERVE A COURT</h1>
</div>

<div className="court-tabs">
{COURTS.map((c) => (
<button
key={c}
className={`court-tab ${court === c ? "active" : ""}`}
onClick={() => {
setCourt(c);
setHour(null);
setConfirmed(null);
}}
>
Court {c}
</button>
))}
</div>

<div className="meta-row">
<div className="meta-pill"><Calendar size={14} /> <b>{todayLabel()}</b></div>
<div className="meta-pill"><Clock size={14} /> 1-hour slots</div>
<div className="meta-pill"><Users size={14} /> Max <b>2</b> players / court</div>
</div>

<div className="slot-list">
{HOURS.map((h) => {
const taken = !!bookedSlots[key(court, h)];
const sel = hour === h;
return (
<div
key={h}
className={`slot-row ${sel ? "selected" : ""} ${taken ? "taken" : ""}`}
onClick={() => !taken && setHour(h)}
>
<div className="time">{formatHour(h)}</div>
<div className="status">{taken ? "Booked" : sel ? "Selected" : "Open"}</div>
</div>
);
})}
</div>

<div className="legend">
<span><span className="dot avail" /> Available</span>
<span><span className="dot taken" /> Already booked</span>
<span><span className="dot sel" /> Your selection</span>
</div>

<div className="form-card">
<div className="field-label">Number of Players</div>
<div className="toggle-row">
<button className={`toggle-btn ${numPlayers === 1 ? "sel" : ""}`} onClick={() => setNumPlayers(1)}>1 Player</button>
<button className={`toggle-btn ${numPlayers === 2 ? "sel" : ""}`} onClick={() => setNumPlayers(2)}>2 Players</button>
</div>

<div className="field-label">Guardian Required?</div>
<div className="toggle-row">
<button className={`toggle-btn ${!guardianRequired ? "sel" : ""}`} onClick={() => setGuardianRequired(false)}>No</button>
<button className={`toggle-btn ${guardianRequired ? "sel" : ""}`} onClick={() => setGuardianRequired(true)}>Yes</button>
</div>

<div className="field-label">Booking As</div>
<div className="toggle-row">
<button className={`toggle-btn ${isMember ? "sel" : ""}`} onClick={() => setIsMember(true)}>Member</button>
<button className={`toggle-btn ${!isMember ? "sel" : ""}`} onClick={() => setIsMember(false)}>Guest</button>
</div>

<div className="field-label">Name</div>
<input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />

{!isMember && (
<>
<div className="field-label">Contact</div>
<input type="tel" placeholder="Phone number" value={contact} onChange={(e) => setContact(e.target.value)} />
</>
)}

{error && <div className="error-box">{error}</div>}

{!confirmed ? (
<button
className="btn-gold"
style={{ width: "100%", marginTop: 20, opacity: canSubmit ? 1 : 0.4 }}
disabled={!canSubmit}
onClick={submit}
>
{hour !== null ? `Confirm Booking — ${formatHour(hour)}, Court ${court}` : "Select a time to continue"}
</button>
) : (
<div className="confirm-box">
<h4><Check size={18} /> Court Reserved</h4>
<p>Court {court}, {todayLabel()} at {hour !== null ? formatHour(hour) : ""}.</p>
<button
className="btn-outline"
style={{ width: "100%" }}
onClick={() => {
setConfirmed(null);
setHour(null);
}}
>
Book Another Slot
</button>
</div>
)}
</div>
</div>
</div>
);
};

export default Bookings;
