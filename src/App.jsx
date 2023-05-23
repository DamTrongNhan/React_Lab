
import "./App.scss";

import { ToastContainer } from "react-toastify";

import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import TableUsers from "./components/TableUsers";

function App() {
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />
        </Container>
        <Container>
          <TableUsers />
        </Container>
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
