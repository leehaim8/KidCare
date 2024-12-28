import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(x => x);

    return (
        <div className="breadcrumbs-container">
            <Link to="/HomePage" className="breadcrumb-item">Home</Link>
            {pathnames.map((pathname, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                return (
                    <span key={to} className="breadcrumb-separator">
                        <span> / </span>
                        <Link to={to} className="breadcrumb-item">{pathname}</Link>
                    </span>
                );
            })}
        </div>
    );
}

export default Breadcrumbs;
