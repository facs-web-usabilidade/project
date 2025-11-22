import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/profile-dropdown.css";

const ProfileDropdown = ({ theme, setTheme, zoom, setZoom }) => {
    const [open, setOpen] = useState(false);

    const handleThemeToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleZoomChange = (e) => {
        setZoom(e.target.value);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        setOpen(false);
        localStorage.removeItem("supa_token");
        navigate("/login");
    }

    return (
        <section className="icons">
            <NavLink to="/cart">
                <img src="/images/shopping_cart_button.png"/>
            </NavLink>

            <section className="profile-dropdown">
                <img id="profile-image" src="/images/profile_icon.png" onClick={() => setOpen(!open)}/>

                {open && (
                <div className={`dropdown-menu ${open ? "show" : ""}`}>
                    <NavLink to="/profile" onClick={() => setOpen(false)}>Perfil</NavLink>
                    <NavLink to="/settings" onClick={() => setOpen(false)}>Configurações</NavLink>
                    <NavLink to="/logout" onClick={handleLogout}>Sair</NavLink>
                    <hr />

                    <div className="menu-item">
                        <span>Tema Claro: </span>
                        <label className="switch">
                            <input type="checkbox" checked={theme === "light"} onChange={handleThemeToggle} />
                            <span className="slider"></span>
                        </label>
                    </div>

                    <div className="menu-item">
                        <span>Zoom: </span>
                        <input type="range" min="75" max="125" value={zoom} step="5" onChange={handleZoomChange}/>
                    </div>
                </div>
                )}
            </section>
        </section>
    );
};

export default ProfileDropdown;
