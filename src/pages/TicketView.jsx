import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Spacer,
} from "@chakra-ui/react";

const TicketView = () => {
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

  async function handleDelete(id) {
     
    try {
      let res = await axios({
        method: "delete",
        url: `http://localhost:3000/tikets/${id}`,
      });
     if(res.status == 200){
      navigate("/tickets");
     }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const { title, discription, status, priority, assignee } = ticket;
  return (
    <>
      <Container mx={"auto"} maxW={"container.xl"}>
        <Box my={10}>
          <Button
            onClick={() => navigate("/tickets")}
            colorScheme="green"
            variant={"outline"}
          >
            Back
          </Button>
        </Box>
        <Box mx={"auto"} width={"md"} my={10}>
          <Card>
            <CardHeader>
              <Heading size="md">{title}</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Status
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {status}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Discription
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {discription}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Assignee
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {assignee}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Priority
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {priority}
                  </Text>
                </Box>
                <Box>
                  <Flex>
                    <Button
                      onClick={() => navigate(`/ticket/edit/${id}`)}
                      variant={"outline"}
                      colorScheme="green"
                    >
                      Edit
                    </Button>
                    <Spacer />
                    <Button onClick={() => handleDelete(id)} colorScheme="red">
                      Delete
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default TicketView;
