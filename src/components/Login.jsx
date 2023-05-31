import { useEffect, useState } from "react";
import "../assets/style/login.scss";
import { login } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { useContext } from "react";
const Login = () => {
  const navigate = useNavigate();

  const { loginContext } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  // const handleAction = async () => {
  //   return new Promise((resolve) => {
  //     toast.success("Login successfully", {
  //       autoClose: false,
  //       closeOnClick: false,
  //       onClose: () => resolve(true),
  //     });
  //   });
  // };

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
    try {
      setLoadingApi(true);
      // const res = await login("eve.holt@reqres.in", "cityslicka");
      const res = await login(email, password);
      if (res && res.token) {
        loginContext(email, res.token);
        // await handleAction();
        toast.success("Login successfully")
        navigate("/");
      } else {
        if (res && res.status === 400) {
          toast.error(res.data.error);
        }
      }
      setLoadingApi(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="login-container">
        <form className="form col-sm-4 col-12">
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
            {loadingApi ? <i className="fa-solid fa-cog fa-spin"></i> : "Login"}
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
