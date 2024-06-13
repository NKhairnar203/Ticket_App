import React from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const About = () => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box bg={bg} color={color} minH="100vh" p={8}>
      <Stack spacing={8} align="center">
        <Heading as="h1" size="2xl">
          About Us
        </Heading>
        <Text fontSize="lg" textAlign="center" maxW="600px">
          Welcome to Client Ticket Solver! Our mission is to provide the best
          customer support solution to help you resolve issues efficiently and
          effectively.
        </Text>

        <Flex
          direction={["column", "column", "row"]}
          align="center"
          justify="center"
        >
          <VStack spacing={4} align="flex-start" p={4}>
            <Heading as="h2" size="lg">
              Our Mission
            </Heading>
            <Text>
              At Client Ticket Solver, we strive to streamline the customer
              support process by providing robust tools and a user-friendly
              interface.
            </Text>
            <Text>
              We believe that every customer deserves timely and effective
              solutions to their problems, and our platform is designed to
              deliver just that.
            </Text>
          </VStack>
          <Image
            boxSize="300px"
            objectFit="cover"
            src="https://img.freepik.com/free-photo/business-team-ai-generated-image_268835-6686.jpg"
            alt="Our Team"
            borderRadius="md"
            m={4}
          />
        </Flex>

        <VStack spacing={4} align="center" p={4}>
          <Heading as="h2" size="lg">
            Our Team
          </Heading>
          <Text maxW="600px" textAlign="center">
            Our dedicated team is composed of experienced professionals
            passionate about customer service and technology. We work tirelessly
            to improve our platform and provide the best experience for our
            users.
          </Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default About;
