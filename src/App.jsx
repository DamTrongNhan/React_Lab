import "./App.scss";

import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Home from "./components/Home";
import Login from "./components/Login";

import { Routes, Route, Link } from "react-router-dom";

import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";

function App() {
  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("email")) {
      loginContext(
        JSON.parse(localStorage.getItem("email")),
        JSON.parse(localStorage.getItem("token"))
      );
    }
  }, []);
  console.log(user);

  return (
    <>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<TableUsers />} />
          <Route path="/login" element={<Login />} />
        </Routes>
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
