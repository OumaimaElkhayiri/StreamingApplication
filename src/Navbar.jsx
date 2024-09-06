import { Link } from "react-router-dom";
import { useAuth } from "./Auth";

export function Navbar() {
    const { isAuthenticated, clearAuthToken } = useAuth();

    const handleLogout = () => {
        clearAuthToken();
        window.location.href = "/";

    };

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation" style={{backgroundColor: "#485FC7"}}>
            <div className="navbar-brand">
                <Link className="navbar-item" style={{color: "white" ,backgroundColor: "#485FC7"}} to="/">
                    TP2
                </Link>
            </div>
            <div className="navbar-menu">
                {!isAuthenticated && (

                    <div className="navbar-end" style={{backgroundColor: "#485FC7"}}>
                        <Link className="navbar-item" style={{color: "white"}} to="/Signup">
                            Sign up
                        </Link>
                        <Link className="navbar-item" style={{color: "white"}} to="/login">
                            Log in
                        </Link>
                        <Link className="navbar-item" style={{color: "white"}} to="/About">
                            About
                        </Link>
                    </div>

                )}
                {isAuthenticated && (
                    <div className="navbar-end" style={{backgroundColor: "#485FC7"}}>
                        <Link className="navbar-item" style={{color: "white"}} to="/History">
                            History
                        </Link>
                        <Link className="navbar-item" style={{color: "white"}} to="/Profile">
                            Profile
                        </Link>
                        <Link className="navbar-item" style={{color: "white"}} onClick={handleLogout}>
                            Logout
                        </Link>
                        <Link className="navbar-item" style={{color: "white"}} to="/About">
                            About
                        </Link>
                    </div>
                )
                }
            </div>
        </nav>)
    ;
}

