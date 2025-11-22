import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const VerifyNoToken = () => {
    const token = localStorage.getItem("supa_token");

    if (token) {
        try {
            const { exp } = jwtDecode(token);
            const isExpired = Date.now() >= exp * 1000;

            if (!isExpired) {
                return <Navigate to="/home" replace />;
            }
        } catch (_) {
        }
    }

    localStorage.removeItem("supa_token");
    return <Outlet />;
};

export default VerifyNoToken;