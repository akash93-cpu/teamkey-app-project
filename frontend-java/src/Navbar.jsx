import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRegUserCircle } from "react-icons/fa";
import { UserLoginPopup, UserUpdatePopup, UserPasswordResetPopup } from './pages/Modals.jsx';

import logo from './assets/logo.png';
import './css/navbar-style.css';

export default function NavigationBar() {

    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [username, setUsername] = useState(null);
    const intervalRef = useRef(null);

    const fetchUsername = async () => {
        try {
            const response = await fetch('http://localhost:8080/user-token', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const name = await response.text();
                setUsername(name);
            } else {
                setUsername(null);
            }
        } catch (err) {
            setUsername(null);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            setUsername(null);
        }
    };

    useEffect(() => {
        fetchUsername();
        intervalRef.current = setInterval(fetchUsername, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <>
            <Navbar expand="lg" className="custom-navbar" fixed='top' container="fluid">
                <Container>
                    <Navbar.Brand id="nav-logo" href="/"><img src={logo} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mx-auto gap-4">
                            <Nav.Link href="/table">Matches</Nav.Link>
                            <Nav.Link href='/stats-home'>Statistics</Nav.Link>
                            <Nav.Link href='/trends'>Trends</Nav.Link>
                            <Nav.Link href="/team-roster">Players</Nav.Link>
                            <Nav.Link href='/teams-stats'>Teams</Nav.Link>
                            <NavDropdown title="More">
                                <NavDropdown.Item href='/support'>Support</NavDropdown.Item>
                                <NavDropdown.Item href='/about-us'>About</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav className="ms-auto">
                            {username ? (
                                <NavDropdown
                                    align="end"
                                    title={
                                        <span className="nav-username">
                                            <FaRegUserCircle size={20} />
                                            {username}
                                        </span>
                                    }
                                >
                                    <NavDropdown.Item disabled>
                                        Signed in as <strong>{username}</strong>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />

                                    <NavDropdown.Item onClick={() => setShowUpdateModal(true)}>
                                        Update your username
                                    </NavDropdown.Item>

                                    <NavDropdown.Item
                                        className="text-danger"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <NavDropdown
                                    align="end"
                                    title={
                                        <span className="icon-link">
                                            <FaRegUserCircle size={26} />
                                        </span>
                                    }
                                    id="user-dropdown"
                                >
                                    <NavDropdown.Item onClick={() => setShowModal(true)}>
                                        Sign In
                                    </NavDropdown.Item>

                                    <NavDropdown.Item href='/register'>
                                        Register
                                    </NavDropdown.Item>

                                </NavDropdown>)}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <UserLoginPopup
                show={showModal}
                handleClose={() => setShowModal(false)}
                onLoginSuccess={fetchUsername}
            />
            <UserUpdatePopup
    show={showUpdateModal}
    handleClose={() => setShowUpdateModal(false)}
    onUpdateSuccess={fetchUsername} />

        </>
    );
}
