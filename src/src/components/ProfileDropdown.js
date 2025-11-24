import { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/profile-dropdown.css";

const ProfileDropdown = ({ theme, setTheme, zoom, setZoom }) => {
    const [open, setOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("supa_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.perfil === "Administrador") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Erro ao ler token:", error);
                setIsAdmin(false);
            }
        }
    }, []);

    const handleThemeToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleZoomChange = (e) => {
        setZoom(e.target.value);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        setOpen(false);
        localStorage.removeItem("supa_token");
        setIsAdmin(false);
        navigate("/login");
    }

    return (
        <section className="icons">
            <NavLink to="/cart">
                <img src="/images/shopping_cart_button.png" alt="Carrinho"/>
            </NavLink>

            <section className="profile-dropdown">
                <img id="profile-image" src="/images/profile_icon.png" onClick={() => setOpen(!open)} alt="Perfil"/>

                {open && (
                <div className={`dropdown-menu ${open ? "show" : ""}`}>
                    <NavLink to="/profile" onClick={() => setOpen(false)}>Perfil</NavLink>
                    {isAdmin && (
                        <NavLink to="/admin" onClick={() => setOpen(false)} style={{ color: 'red' }}>
                            Painel Admin
                        </NavLink>
                    )}

                    <NavLink to="/settings" onClick={() => setOpen(false)}>Configurações</NavLink>
                    <Link onClick={handleLogout}>Sair</Link>
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