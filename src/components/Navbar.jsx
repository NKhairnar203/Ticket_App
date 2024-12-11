import {
  Box,
  Flex,
  Image,
  Spacer,
  Button,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import vite from "../assets/react.svg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import {
  RiCommunityLine,
  RiContactsLine,
  RiHome2Line,
  RiLoginBoxLine,
  RiMenuLine,
  RiSunFill,
  RiTicket2Line,
} from "@remixicon/react";
const Navbar = () => {
  const { logout, auth } = useContext(AuthContext);
  const { toggleColorMode } = useColorMode();

  function signOut() {
    logout();
    window.location.reload();
  }
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        boxShadow={"lg"}
        h={{ base: "60px", md: "80px" }}
        w={"100%"}
      >
        <Container maxW={"container.xl"} w={{ base: "100%" }} py={"5px"} p={4}>
          <Flex
            h={"100%"}
            justifyContent={"space-between"}
            mx={"10px"}
            alignItems={"center"}
          >
            <Box>
              <Image width={{ base: "20px", md: "100%" }} src={vite} />
            </Box>
            <Spacer />
            <Box onClick={toggleColorMode}>
              <RiSunFill />
            </Box>
            <Box ml={"20px"} display={{ base: "block", md: "none" }}>
              <Menu>
                <MenuButton
                  w={"10px"}
                  as={IconButton}
                  aria-label="Options"
                  variant="outline"
                  icon={<RiMenuLine size={"20px"} />}
                />
                <MenuList>
                  <Link to="/">
                    <MenuItem icon={<RiHome2Line />}>Home</MenuItem>
                  </Link>
                  <Link to="/tickets">
                    <MenuItem icon={<RiTicket2Line />}>Tickets</MenuItem>
                  </Link>
                  <Link to="/about">
                    <MenuItem icon={<RiCommunityLine />}>About</MenuItem>
                  </Link>
                  <Link to="/contact">
                    <MenuItem icon={<RiContactsLine />}>Contact</MenuItem>
                  </Link>
                  {auth.token ? null : (
                    <>
                      <Link to="/register">
                        <MenuItem icon={<RiLoginBoxLine />}>Register</MenuItem>
                      </Link>
                      <Link to="/login">
                        <MenuItem icon={<RiLoginBoxLine />}>Login</MenuItem>
                      </Link>
                    </>
                  )}

                  {auth.token ? (
                    <MenuItem onClick={signOut} icon={<RiLoginBoxLine />}>
                      LogOut
                    </MenuItem>
                  ) : null}
                </MenuList>
              </Menu>
            </Box>
            <Flex display={{ base: "none", md: "block" }} alignItems={"center"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                w={{ base: "100%", md: "600px" }}
                alignItems={"center"}
                h={"100%"}
                fontWeight={700}
                py={"5px"}
                px={"8px"}
                mx={8}
              >
                <Link to="/">Home</Link>
                <Link to="/tickets">Tickets</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>

                {auth.token ? null : (
                  <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                  </>
                )}
                {auth.token ? (
                  <Button
                    variant={"outline"}
                    colorScheme="red"
                    onClick={logout}
                  >
                    LogOut
                  </Button>
                ) : null}
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
