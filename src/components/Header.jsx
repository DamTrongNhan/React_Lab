import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { handleLogoutRedux } from "../redux/actions/userAction";
import { toast } from "react-toastify";

import logoApp from "../assets/image/logo512.png";
import "../assets/style/header.scss";

const Header = (props) => {
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };
  useEffect(() => {
    if (
      account &&
      account.auth === false &&
      window.location.pathname !== "/login"
    ) {
      toast.success("Logout successfully");
      navigate("/");
    }
  }, [account]);
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
            {((account && account.auth) ||
              window.location.pathname === "/") && (
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
                    {account && account.auth && account.email && (
                      <span>Welcome {account.email}</span>
                    )}
                  </div>
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {account && account.auth === true ? (
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
