import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import TableUsers from "../components/TableUsers";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* <PrivateRoute path="/users">
        <TableUsers />
        <NoPermission />
      </PrivateRoute> */}
    </>
  );
};
export default AppRoutes;
