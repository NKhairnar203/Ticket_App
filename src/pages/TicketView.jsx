import { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../context/AuthContextProvider";

const TicketView = () => {
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
        url: `http://localhost:3000/api/v1/ticket/delete/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.status == 200) {
        navigate("/tickets");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const { title, description, status, priority } = ticket;
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
                    {description}
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
