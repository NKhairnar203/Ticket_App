import { useState, useContext } from "react";
import {
  Container,
  Textarea,
  Input,
  VStack,
  Heading,
  Box,
  Text,
  Select,
  Flex,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";

const TicketCreate = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { auth } = useContext(AuthContext);
  const [priority, setPriority] = useState("");

  async function handleSubmit() {
    console.log(title, description, status);
    try {
      const newTicket = {
        title: title,
        description: description,
        priority: priority,
      };

      let res = await axios({
        method: "post",
        url: `http://localhost:3000/api/v1/ticket/create`,
        data: newTicket,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      console.log(res);
      if (res.status === 201) {
        navigate("/tickets");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleBack() {
    navigate("/tickets");
  }

  return (
    <Container maxW={"container.md"}>
      <Box p={2} my={8} boxShadow={"lg"}>
        <Heading my={6} textAlign={"center"}>
          Create Ticket
        </Heading>
        <VStack spacing={4} my={100} mx={"auto"} maxW={"500px"}>
          <Box w={"100%"}>
            <Text fontWeight={600}>Title</Text>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
            />
          </Box>
          <Box w={"100%"}>
            <Text fontWeight={600}>Discription</Text>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="discription"
            />
          </Box>

          <Box w={"100%"}>
            <Text fontWeight={600}>Priority</Text>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="Select Priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </Box>
          <Flex mt={6} w={"100%"} justifyContent="space-evenly">
            <Button colorScheme="red" onClick={handleSubmit}>
              Create Ticket
            </Button>
            <Button onClick={handleBack} colorScheme="red" variant={"outline"}>
              Back
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Container>
  );
};

export default TicketCreate;
