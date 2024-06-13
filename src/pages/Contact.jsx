import { Box, Container, Heading, Image, Link, LinkBox, Text } from '@chakra-ui/react'
import React from 'react'

const Contact = () => {
  return (
    <Container
      py={20}
      maxW={"container.xl"}
      h={"auto"}
    >
      <Heading textAlign={"center"} fontWeight={800} my={10}>
        Contact Us
      </Heading>
      <Box>
        <Text fontSize={"28px"} textAlign={"center"}>
          We know that choosing the right institute or a career path can be a
          difficult and tiring process, and that's why we're here for you.
          Contact us to ask any questions, we'll respond over email as soon as
          possible!
        </Text>
        <Image
          my={10}
          mx={"auto"}
          width={"100px"}
          src="https://masaischool.com/images/contact/mail.svg"
        />
        <Text textAlign={"center"} fontSize={"30px"} fontWeight={700}>
          Write to us at
        </Text>
        <LinkBox textAlign={"center"} my={3}>
          <Link mx={"auto"} fontSize={"30px"} textDecoration={"underline"} color={"blue.500"}>nkhairnar543@gmail.com</Link>
        </LinkBox>
      </Box>
    </Container>
  );
}

export default Contact
