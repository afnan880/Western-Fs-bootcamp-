import { useState } from "react";
import Home from "./Home";
import Squash from "./Squash";
import Bookings from "./Bookings";
import type { Page } from "./Home";

function App() {
const [page, setPage] = useState<Page>("home");

if (page === "squash") return <Squash onNavigate={setPage} currentPage={page} />;
if (page === "bookings") return <Bookings onNavigate={setPage} currentPage={page} />;
return <Home onNavigate={setPage} currentPage={page} />;
}

export default App;

