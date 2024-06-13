import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";


const Private = ({ children }) => {
  // let isLoggedIn = false;
  const { auth } = useContext(AuthContext);

  if (!auth?.isLoggedIn) {
    return <Navigate to="/login" />;
  }
 

  return children;
}

export default Private;