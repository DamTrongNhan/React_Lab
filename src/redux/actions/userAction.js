import { toast } from "react-toastify";
import { login } from "../../services/UserService";

export const USER_LOGOUT = "USER_OUT";
export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const REFRESH = "REFRESH";

export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });
    try {
      const res = await login(email.trim(), password);
      if (res && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", email.trim());
        dispatch({
          type: FETCH_USER_SUCCESS,
          data: { email: email.trim(), token: res.token },
        });
        // await handleAction();
        toast.success("Login successfully");
      } else {
        if (res && res.status === 400) {
          dispatch({ type: FETCH_USER_ERROR });
          toast.error(res.data.error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const handleLogoutRedux = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT });
  };
};

export const handleRefresh = () => {
  return async (dispatch, getState) => {
    dispatch({ type: REFRESH });
  };
};
