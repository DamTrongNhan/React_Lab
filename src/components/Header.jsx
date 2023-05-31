import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocation, NavLink } from "react-router-dom";

import "../assets/style/header.scss";
import logoApp from "../assets/image/logo512.png";

const Header = (props) => {
  // const location = useLocation();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className="nav-header nav-link">
              <img
                src={logoApp}
                width={30}
                height={30}
                className="me-2 d-inline-block align-top"
                alt="React logo"
              />
              <span>React-lab</span>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-header nav-link">
                Home
              </NavLink>

              <NavLink to="/users" className="nav-header nav-link">
                Manage users
              </NavLink>
            </Nav>

            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink to="/login" className="nav-header nav-link">
                    Login
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="" className="nav-header nav-link">
                    Logout
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
