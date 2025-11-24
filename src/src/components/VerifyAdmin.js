import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const VerifyAdmin = () => {
    const token = localStorage.getItem("supa_token");

    let role;
    
    try {
        const decoded = jwtDecode(token);
        role = decoded.perfil;
    } catch {
    }

    if (role !== "Administrador") return <Navigate to="/home" replace />;

    return <Outlet />;
};

export default VerifyAdmin;