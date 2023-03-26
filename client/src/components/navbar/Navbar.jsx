import "./navbar.css"
import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo">Mernbooking</span>
                {
                    user ? (
                        <div className="navItems">
                            <span>{user.username}</span>
                            <span onClick={handleLogout}>Logout</span>
                        </div>
                    ) : (
                        <div className="navItems">
                            <Link to="/register" className="linkStyle">
                                <button className="navButton">Register</button>
                            </Link>
                            <Link to="/login" className="linkStyle">
                                <button className="navButton">Login</button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar