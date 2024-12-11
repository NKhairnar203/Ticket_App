import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  useColorMode,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const { login, auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formData
      );
      login(response.data.Token);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (auth.isLoggedIn) {
    return <Navigate to="/tickets" />;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      px={4}
    >
      <Box
        maxW="md"
        w="full"
        p={6}
        bg={colorMode === "light" ? "white" : "gray.700"}
        boxShadow="md"
        borderRadius="lg"
      >
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Log In
        </Heading>

        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </FormControl>

          <Button
            onClick={handleLogin}
            colorScheme="blue"
            isFullWidth
            isLoading={loading}
          >
            {loading ? <Spinner size="sm" /> : "Log In"}
          </Button>
        </VStack>

        <Box
          mt={4}
          textAlign="center"
          fontSize="sm"
          color={colorMode === "light" ? "gray.600" : "gray.300"}
        >
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "red" }}>
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
