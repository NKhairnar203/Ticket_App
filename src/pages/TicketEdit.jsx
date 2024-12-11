import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import axios from "axios";
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
import { AuthContext } from "../context/AuthContextProvider";

const TicketEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState({});
  const [err, setErr] = useState(false);
  const { auth } = useContext(AuthContext);

  async function fetchData(id) {
    setLoading(true);
    try {
      let res = await axios({
        method: "get",
        url: `http://localhost:3000/api/v1/ticket/view/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setTicket(res.data.ticket);
      console.log(res.data.ticket);
      setErr(false);
      setLoading(false);
    } catch (error) {
      setErr(true);
    }
  }

  useEffect(() => {
    fetchData(id);
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (err) {
    return <Error />;
  }

  async function handleEdit() {
    try {
      console.log(ticket);
      const updateicket = {
        title: title,
        description: description,
        priority: priority,
      };
      let res = await axios({
        method: "put",
        url: `http://localhost:3000/api/v1/ticket/edit/${id}`,
        data: updateicket,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(res);
      if (res.data.status == true) {
        navigate("/tickets");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { title, description, priority } = ticket;
  return (
    <>
      <Container maxW={"container.md"}>
        <Box p={2} my={8} boxShadow={"lg"}>
          <Heading my={6} textAlign={"center"}>
            Edit Ticket
          </Heading>
          <VStack spacing={4} my={100} mx={"auto"} maxW={"500px"}>
            <Box w={"100%"}>
              <Text fontWeight={600}>Title</Text>
              <Input
                value={title}
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    title: e.target.value,
                  })
                }
                placeholder="title"
              />
            </Box>
            <Box w={"100%"}>
              <Text fontWeight={600}>Discription</Text>
              <Textarea
                value={description}
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    description: e.target.value,
                  })
                }
                placeholder="discription"
              />
            </Box>

            <Box w={"100%"}>
              <Text fontWeight={600}>Priority</Text>
              <Select
                value={priority}
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    priority: e.target.value,
                  })
                }
                placeholder="Select Priority"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </Box>
            <Flex mt={6} w={"100%"} justifyContent="space-evenly">
              <Button colorScheme="red" onClick={handleEdit}>
                Edit Ticket
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export default TicketEdit;
