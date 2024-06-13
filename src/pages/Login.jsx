import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  Container,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text
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
        {/* <Heading color={"red"} my={-3} fontSize={"20px"}>Email: eve.holt@reqres.in </Heading>
        <Heading color={"green"} my={-3} fontSize={"20px"}>Password: cityslicka</Heading> */}
        <Popover>
          <PopoverTrigger>
            <Button bg={"teal.400"}> Check Email & Password</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
           
            <PopoverBody>
              <Text textAlign={"center"} fontWeight={700} color={"red"}>
                Email: eve.holt@reqres.in
              </Text>
              <Text textAlign={"center"} fontWeight={700} color={"green"}>
                Password: cityslicka
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
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
