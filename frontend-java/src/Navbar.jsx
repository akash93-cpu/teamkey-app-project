import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaRegUserCircle } from "react-icons/fa";

import logo from './assets/logo.png';
import './css/navbar-style.css';

export default function NavigationBar() {

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
                            <Nav.Link>Trends</Nav.Link>
                            <Nav.Link href="/team-roster">Players</Nav.Link>
                            <Nav.Link href='/teams-stats'>Teams</Nav.Link>
                            <NavDropdown title="More">
                                <NavDropdown.Item href='/support'>Support</NavDropdown.Item>
                                <NavDropdown.Item>About</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav className="ms-auto">
                            <Nav.Link href="/login" className="icon-link">
                                <FaRegUserCircle size={26} />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );

}