import { Link } from "react-router-dom";
import "../styles/supa-logo.css";

const SupaLogo = ({ invisible }) => (
    <div className={`supagames-container ${invisible ? "supagames-hidden" : ""}`}>
        <Link className="supagames-link-home" to={"/"}>
            <img
                src="/logo512.png"
                width="50px"
                height="50px"
                alt="SUPA games logo"
            />
            <p>SUPA-Games</p>
        </Link>
    </div>
);

export default SupaLogo;