
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";




const HeroSection = () => {

  const navigate = useNavigate();
  function handleClick() {
    navigate("/tickets");
  }
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading fontWeight="extrabold" size="2xl">
        Welcome to Client Ticket Solver
      </Heading>
      <Text fontSize="xl" mt={4}>
        Your one-stop solution for managing client tickets efficiently.
      </Text>
      <Button colorScheme="teal" size="lg" onClick={handleClick} mt={6}>
        Get Started
      </Button>
    </Box>
  );
};

const FeaturesSection = () => (
  <Box py={10} px={6} bg={useColorModeValue("gray.50", "gray.800")}>
    <Heading textAlign="center" mb={6}>
      Features
    </Heading>
    <VStack spacing={8}>
      <HStack spacing={6} align="start">
        <Image
          boxSize="100px"
          src="https://miro.medium.com/v2/resize:fit:800/1*VtAozzg_xdDzbuEQEDJB4A.jpeg"
          alt="Feature 1"
        />
        <Box>
          <Heading size="md">Efficient Ticket Management</Heading>
          <Text>
            Manage your client tickets efficiently and effectively with our
            system.
          </Text>
        </Box>
      </HStack>
      <HStack spacing={6} align="start">
        <Image
          boxSize="100px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkO0p7QSt_PQdZZUnLGgWokBeRWXO_EFsAcw&s"
          alt="Feature 2"
        />
        <Box>
          <Heading size="md">Real-Time Updates</Heading>
          <Text>Get real-time updates on the status of your tickets.</Text>
        </Box>
      </HStack>
      <HStack spacing={6} align="start">
        <Image
          boxSize="100px"
          src="https://dmt5ct25cwczv.cloudfront.net/images/blog-post/2021/0/ui-image-1b775340-b041-4817-856b-ad7778287aa0-mobile.png"
          alt="Feature 3"
        />
        <Box>
          <Heading size="md">User-Friendly Interface</Heading>
          <Text>
            Our user-friendly interface ensures that you can navigate and manage
            tickets with ease.
          </Text>
        </Box>
      </HStack>
    </VStack>
  </Box>
);

const Footer = () => (
  <Box py={4} textAlign="center" bg={useColorModeValue("gray.100", "gray.900")}>
    <Text>© 2024 Client Ticket Solver. All rights reserved.</Text>
  </Box>
);

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </Box>
  );
};

export default HomePage;
