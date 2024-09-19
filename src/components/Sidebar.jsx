import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { FaDownLeftAndUpRightToCenter } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setNavbarState } from '../redux/slices/urlSlice';
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import '../styles/Sidebar.css';


const Sidebar = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsOpen(true);
        onToggle(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
        onToggle(false);
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Logged out",
            text: "You have been logged out",
            icon: "success"
        });
        Cookies.remove('token')
        navigate("/login");
        dispatch(setNavbarState(true))
    };

    return (
        <div
            className={`sidebar ${isOpen ? 'open' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Nav className="flex-column">
                <Nav.Item className="sidebar-item">
                    <Nav.Link as={Link} to="/" className="d-flex align-items-center nav-link active">
                        <FaHome size={24} />
                        {isOpen && <span className="ms-2">Home</span>}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="sidebar-item">
                    <Nav.Link as={Link} to="/shortner" className="d-flex align-items-center nav-link">
                        <FaDownLeftAndUpRightToCenter size={24} />
                        {isOpen && <span className="ms-2">Shorten URL</span>}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="sidebar-item">
                    <Nav.Link as={Link} to="/generated-urls" className="d-flex align-items-center nav-link">
                        <FaTableList size={24} />
                        {isOpen && <span className="ms-2">All URL's</span>}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="sidebar-item logout">
                    <Nav.Link className="d-flex align-items-center nav-link">
                        <FaSignOutAlt size={24} />
                        {isOpen && <span className="ms-2" onClick={handleLogout}>Logout</span>}
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>

    );
};

export default Sidebar;

