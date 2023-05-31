import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import "../assets/style/header.scss";
import logoApp from "../assets/image/logo512.png";
import { toast } from "react-toastify";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState, useEffect } from "react";

const Header = (props) => {
  // const location = useLocation();
  const { logout, user } = useContext(UserContext);

  // const [hideHeader, setHideHeader] = useState(false);

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    navigate("/");
  };
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
            {((user && user.auth) || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-header nav-link">
                    Home
                  </NavLink>

                  <NavLink to="/users" className="nav-header nav-link">
                    Manage users
                  </NavLink>
                </Nav>
                <Nav>
                  <div className="nav-link">
                    {user && user.auth && user.email && (
                      <span>Welcome {user.email}</span>
                    )}
                  </div>
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {user && user.auth === true ? (
                      <NavDropdown.Item>
                        <span
                          onClick={handleLogout}
                          className="nav-header nav-link"
                        >
                          Logout
                        </span>
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item>
                        <span
                          onClick={() => navigate("/login")}
                          className="nav-header nav-link dropdown-item"
                        >
                          Login
                        </span>
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
