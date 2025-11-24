import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import HamburgerMenu from "./HamburgerMenu";
import ProfileDropdown from "./ProfileDropdown";
import SupaLogo from "./SupaLogo";

const Layout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const [zoom, setZoom] = useState(localStorage.getItem("zoom") || 100);

    useEffect(() => {
        document.body.classList.toggle("light-theme", theme === "light");
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        document.body.style.zoom = `${zoom}%`;
        localStorage.setItem("zoom", zoom);
    }, [zoom]);

    return (
        <div className="app-layout">
            <HamburgerMenu onClick={() => setSidebarVisible(!sidebarVisible)} />
            <SupaLogo invisible={sidebarVisible} />
            <Sidebar visible={sidebarVisible} onNavigate={() => setSidebarVisible(false)} />
            <div className="main-content">
                <Topbar />
                <ProfileDropdown theme={theme} setTheme={setTheme} zoom={zoom} setZoom={setZoom}/>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
