import  { useState, useEffect } from "react";
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

const TicketEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState({});
  const [err, setErr] = useState(false);

  async function fetchData(id) {
    setLoading(true);
    try {
      let res = await axios({
        method: "get",
        url: `http://localhost:3000/tikets/${id}`,
      });
      setTicket(res.data);
      console.log(res.data);
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
       discription: discription,
       assignee: assignee,
       status: status,
       priority: priority,
     };
     let res = await axios({
       method: "put",
       url: `http://localhost:3000/tikets/${id}`,
       data: updateicket,
     });
     console.log(res);
     if (res.status === 200) {
       navigate("/tickets");
     }
   } catch (error) {
     console.log(error);
   }
 }

  const { title, discription, status, priority, assignee } = ticket;
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
                value={discription}
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    discription: e.target.value,
                  })
                }
                placeholder="discription"
              />
            </Box>
            <Box w={"100%"}>
              <Text fontWeight={600}>Assignee</Text>
              <Select
                value={assignee}
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    assignee: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    status: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setTicket({
                    ...ticket,
                    priority: e.target.value,
                  })
                }
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
              <Button colorScheme="red" onClick={ handleEdit}>
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
