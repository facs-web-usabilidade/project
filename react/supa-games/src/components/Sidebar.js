import { NavLink } from "react-router-dom"; // Aqui é para deixar o link ativo quando estiver na página dele, está como o professor mostrou no slide
import "../styles/sidebar.css";

const Sidebar = ({ visible, onNavigate  }) => {
    return (
        <aside className={`sidebar ${visible ? "" : "hidden"}`}>
            <ul className="menu">
                <li>
                    <NavLink 
                        to="/home" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        onClick={onNavigate}
                    >
                        <img src="/images/home_icon.png"/>
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/games" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        onClick={onNavigate}
                    >
                        <img src="/images/games_icon.png"/>
                        Jogos
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/genres" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        onClick={onNavigate}
                    >
                        <img src="/images/genre_icon.png"/>
                        Gêneros
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/wishlist" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        onClick={onNavigate}
                    >
                        <img src="/images/wishlist_icon.png"/>
                        Lista de desejos
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/profile" 
                        className={({ isActive }) => isActive ? "active-link" : ""}
                        onClick={onNavigate}
                    >
                        <img src="/images/profile_icon.png"/>
                        Perfil
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;