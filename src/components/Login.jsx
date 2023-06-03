import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";

import "../assets/style/login.scss";
const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.user.isLoading);

  const account = useSelector((state) => state.user.account);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }
    dispatch(handleLoginRedux(email, password));
  };

  const handlePressEnter = async (event) => {
    if (event && event.key === "Enter") {
      await handleLogin(event);
    }
  };

  useEffect(() => {
    if (account && account.auth === true) {
      navigate("/");
    }
  }, [account]);
  return (
    <>
      <div className="login-container">
        <form className="form col-sm-4 col-11 ">
          <div className="title mb-3">Login</div>
          <div className="input-container col-12">
            <label className="label mb-1">Username: eve.holt@reqres.in</label>
            <input
              type="text"
              name="username"
              className="input col-12 mb-2"
              placeholder=""
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-container col-12">
            <label className="label mb-1">Password: cityslicka</label>
            <div className="col-12 mb-2">
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                className="input col-12"
                placeholder=""
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={handlePressEnter}
              />
              <i
                className={`fa-solid ${
                  isShowPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => {
                  setIsShowPassword(!isShowPassword);
                }}
              ></i>
            </div>
          </div>
          <NavLink to="" className="forgotten-password mb-2 nav-link">
            Forgot password?
          </NavLink>
          <button
            className={`mt-4 button ${email && password ? "active" : ""} `}
            disabled={email && password ? false : true}
            onClick={handleLogin}
          >
            {/* &nbsp; */}
            {isLoading ? <i className="fa-solid fa-cog fa-spin"></i> : "Login"}
          </button>
        </form>
        <div className="back mt-5">
          <NavLink to="/" className="nav-link">
            <i className="fa-solid fa-arrow-left me-2"></i> Back
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default Login;
