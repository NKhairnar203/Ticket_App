import  { createContext, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const toast = useToast();
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
  });

  const login = (token) => {
    setAuth({
      isLoggedIn:true,
      token:token,
    })
  }
  const logout = () => {
    setAuth({
      isLoggedIn: false,
      token: null,
    });
     toast({
      duration:"1000",
       title: `LOGOUT`,
       status: `error`,
       position:"top",
       isClosable: true,
     });
  };

  return <AuthContext.Provider value={{auth , login,logout}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
