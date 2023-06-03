import {
  USER_LOGOUT,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  REFRESH,
} from "../actions/userAction";

const INITIAL_STATE = {
  account: {
    email: "",
    auth: null,
    token: "",
  },
  isLoading: false,
  isError: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        account: {
          email: action.data.email,
          auth: true,
          token: action.data.token,
        },
      };
    }
    case FETCH_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        account: { auth: false },
      };
    }
    case USER_LOGOUT: {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return {
        ...state,
        account: {
          email: "",
          auth: false,
          token: "",
        },
      };
    }
    case REFRESH: {
      return {
        ...state,
        account: {
          email: localStorage.getItem("email"),
          auth: true,
          token: localStorage.getItem("token"),
        },
      };
    }
    default:
      return state;
  }
};
export default userReducer;
