import  { useState } from "react";
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

const TicketCreate = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  async function handleSubmit() {
    console.log(title, discription, status);
    try {
      const newTicket = {
        title: title,
        discription: discription,
        assignee: assignee,
        status: status,
        priority: priority,
      };

      let res = await axios({
        method: "post",
        url: `http://localhost:3000/tikets`,
        data: newTicket,
      });

      console.log(res)
      if(res.status === 201){
        navigate("/tickets")
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
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              placeholder="discription"
            />
          </Box>
          <Box w={"100%"}>
            <Text fontWeight={600}>Assignee</Text>
            <Select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Select Assignee"
            >
              <option value="rahul">Rahul</option>
              <option value="nilesh">Nilesh</option>
              <option value="sanket">Sanket</option>
              <option value="rushikesh">Rushikesh</option>
              <option value="sourabhh">Sourabh</option>
            </Select>
          </Box>
          <Box w={"100%"}>
            <Text fontWeight={600}>Status</Text>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Select Status"
            >
              <option value="pending">Pending</option>
              <option value="progress">Progress</option>
              <option value="completed">Completed</option>
            </Select>
          </Box>
          <Box w={"100%"}>
            <Text fontWeight={600}>Priority</Text>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="Select Priority"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
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
