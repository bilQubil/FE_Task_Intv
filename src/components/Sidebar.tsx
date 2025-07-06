function Sidebar() {
    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-light h-full"
            style={{ width: "280px" }}
        >
            <a
                href="/profile"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
                <span className="text-xl font-medium">
                    Employee Management System
                </span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a
                        href="/profile"
                        className="nav-link active"
                        aria-current="page"
                    >
                        Profile
                    </a>
                </li>
                <li>
                    <a href="/add-biodata" className="nav-link link-dark">
                        Add Biodata
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
