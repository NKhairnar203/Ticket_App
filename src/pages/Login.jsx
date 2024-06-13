import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Container,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    login,
    auth: { isLoggedIn },
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  async function handleLogin() {
    

    try {
      let response = await axios({
        method: "post",
        url: "https://reqres.in/api/login",
        data: {
          email,
          password,
        },
      });
      login(response.data.token);
      console.log(response);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  if (isLoggedIn) {
    return <Navigate to="/tickets"/>;
  }
  

  return (
    <Container maxW={"md"}>
      <VStack spacing={8} mt={20} px={"20px"} py={"40px"} boxShadow={"lg"}>
        <Heading>Login</Heading>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          w={"95%"}
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
          w={"95%"}
        />
        <Button onClick={handleLogin} colorScheme="blue">
          Login
        </Button>
      </VStack>
    </Container>
  );
};

export default Login;
