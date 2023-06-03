import "./App.scss";

import { ToastContainer } from "react-toastify";

import Header from "./components/Header";

import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";

function App() {
  const dataUserRedux = useSelector((state) => state.user.account);
  console.log(dataUserRedux);
  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("email")) {
      loginContext(
        JSON.parse(localStorage.getItem("email")),
        JSON.parse(localStorage.getItem("token"))
      );
    }
  }, []);
  // console.log(user);

  return (
    <>
      <div className="app-container">
        <Header />
        <AppRoutes />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
