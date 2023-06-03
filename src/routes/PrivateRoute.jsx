import NoPermission from "../components/Nopermission";

import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const account = useSelector((state) => state.user.account);

  if (account && !account.auth) {
    return (
      <>
        <NoPermission />
      </>
    );
  }

  return <>{props.children}</>;
};
export default PrivateRoute;
