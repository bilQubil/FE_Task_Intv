import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        Swal.fire({
            title: "Success",
            text: "Logout successful",
            icon: "success",
            timer: 3000,
        });
        navigate("/login");
    };

    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-light"
            style={{
                width: "280px",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <NavLink
                to="/profile"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
                <span className="text-xl font-medium">
                    Employee Management System
                </span>
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : "link-dark"}`
                        }
                    >
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/add-biodata"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "active" : "link-dark"}`
                        }
                    >
                        Add Biodata
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div>
                <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger w-100"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
