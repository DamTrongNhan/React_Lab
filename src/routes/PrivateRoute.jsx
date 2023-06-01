import { Routes, Route } from "react-router-dom";

import { Alert } from "react-bootstrap";

import { createElement, useContext } from "react";
import { UserContext } from "../context/UserContext";

import NoPermission from "../components/Nopermission";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);

  console.log(props);

  if (user && !user.auth) {
    return (
      <>
        <NoPermission />
      </>
    );
    // return (
    //   <>
    //     <Alert variant="danger" dismissible>
    //       <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
    //       <p>You don't have permission to access this route</p>
    //     </Alert>
    //   </>
    // );
  }

  return <>{props.children}</>;
};
export default PrivateRoute;
