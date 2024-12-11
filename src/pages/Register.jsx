import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        navigate("/login");
        toast({
          title: "Registration Successful",
          description: data.message || "You have successfully signed up!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({ name: "", email: "", password: "" });
      } else {
        toast({
          title: "Registration Failed",
          description:
            data.message || "Something went wrong. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to connect to the server. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

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
          Sign Up
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </FormControl>

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
              type="submit"
              colorScheme="blue"
              isFullWidth
              isLoading={loading}
            >
              Sign Up
            </Button>
          </VStack>
        </form>

        <Text
          mt={4}
          fontSize="sm"
          textAlign="center"
          color={colorMode === "light" ? "gray.600" : "gray.300"}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "red" }}>
            Log In
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Register;
