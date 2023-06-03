import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction";

import "./App.scss";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("email")) {
      dispatch(handleRefresh());
    }
  }, []);

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
