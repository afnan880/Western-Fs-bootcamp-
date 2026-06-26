import { NavLink, Outlet } from 'react-router';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/customers">
                                Customers
                            </NavLink>
                        </li>
                         <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/customers/add">
                                 Add Customers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/users">
                                Users
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/employees">
                                Employees
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/Departments">
                                Departments
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/Departments/Add">
                                Department Form
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/EmployeeName">
                                Employee
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar;