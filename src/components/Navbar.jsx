import {
  Box,
  Flex,
  Image,
  Spacer,
  Button,
  Container,
  useColorMode,

  
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import vite from "../assets/react.svg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Navbar = () => {
  const { logout,auth  } = useContext(AuthContext);
  const { toggleColorMode } = useColorMode();

  console.log(toggleColorMode)
  return (
    <>
      <Box display={"flex"} alignItems={"center"} boxShadow={"lg"} h={"80px"}>
        <Container maxW={"container.xl"} p={4}>
          <Flex
            h={"100%"}
            justifyContent={"space-between"}
            mx={"10px"}
            alignItems={"center"}
          >
            <Box>
              <Image src={vite} />
            </Box>
            <Spacer />
            <Flex alignItems={"center"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                w={"600px"}
                alignItems={"center"}
                h={"100%"}
                fontWeight={700}
                py={"5px"}
                px={"8px"}
                mx={8}
              >
                <Button onClick={toggleColorMode}>Dark / Light</Button>
                <Link to="/">Home</Link>
                <Link to="/tickets">Tickets</Link>{" "}
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                {auth.isLoggedIn ? null : <Link to="/login">Login</Link>}
              </Box>

              {auth.isLoggedIn ? (
                <Button
                  variant={"outline"}
                  colorScheme="red"
                  onClick={ logout } >
                  LogOut
                </Button>
              ) : null}
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
