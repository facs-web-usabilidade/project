import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const VerifyToken = () => {
    const token = localStorage.getItem("supa_token");

    if (!token) return <Navigate to="/login" replace />;

    try {
        const { exp } = jwtDecode(token);
        const isExpired = Date.now() >= exp * 1000;

        if (isExpired) {
            localStorage.removeItem("supa_token");
            return <Navigate to="/login" replace />;
        }
    } catch (err) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default VerifyToken;