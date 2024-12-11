import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";


const Private = ({ children }) => {
  // let isLoggedIn = false;
  const token = localStorage.getItem("token")
  // const { auth } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }
 

  return children;
}

export default Private;