import React from "react";
import { toast } from "react-toastify";
// @function  UserContext
const UserContext = React.createContext({ email: "", auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: "", auth: false });
  const loginContext = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("email", JSON.stringify(email));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

// // @function  UnauthApp
// function UnauthApp() {
//   const { loginContext } = React.useContext(UserContext);
//   const [email, setemail] = React.useState();

//   return (
//     <>
//       <h1>Please, log in!</h1>

//       <label>email:</label>
//       <input
//         type="text"
//         onChange={(event) => {
//           setemail(event.target.value);
//         }}
//       />
//       <button onClick={() => loginContext(email)}>Log in</button>
//     </>
//   );
// }

// // @function  AuthApp
// function AuthApp() {
//   const { user, logout } = React.useContext(UserContext);

//   return (
//     <>
//       <h1>Hello, {user.email}!</h1>
//       <button onClick={logout}>Logout</button>
//     </>
//   );
// }

// // @function  App
// function App() {
//   const { user } = React.useContext(UserContext);

//   return user.auth ? <AuthApp /> : <UnauthApp />;
// }

// ReactDOM.render(
//   <UserProvider>
//     <App />
//   </UserProvider>,
//   document.getElementById("root")
// );
