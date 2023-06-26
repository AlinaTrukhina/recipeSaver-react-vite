import React from "react";
import { Link } from 'react-router-dom';

function SidebarNav() {
    return (
        <>
            <div className="navDiv">
                <Link to="/">Search 1</Link>
                <Link to="/2">Search 2</Link>
            </div>
        </>
    );
}

export default SidebarNav;