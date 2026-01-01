import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
                    <Nav className="nav-center gap-4">
                        <Nav.Link href='/table'>Matches</Nav.Link>
                        <Nav.Link>Statistics</Nav.Link>
                        <Nav.Link>Trends</Nav.Link>
                        <Nav.Link href='/team-roster'>Teams</Nav.Link>
                        <NavDropdown title="More" id="basic-nav-dropdown">
                            <NavDropdown.Item>Support</NavDropdown.Item>
                            <NavDropdown.Item>
                                About
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );

}