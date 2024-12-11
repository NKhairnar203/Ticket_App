import React, { useContext } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Spacer,
  Select,
  SimpleGrid,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import TicketCard from "../components/TicketCard";
import { AuthContext } from "../context/AuthContextProvider";

// eve.holt@reqres.in

const Tickets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState([]);
  const [err, setErr] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [search, SetSearch] = useState("");

  const { auth } = useContext(AuthContext);
  async function fetchData(selectValue, filterValue) {
    setLoading(true);
    try {
      let isParams = {};
      if (filterValue) {
        isParams.status = filterValue;
      }
      if (selectValue) {
        isParams._sort = "priority";
        isParams._order = selectValue;
      }

      let res = await axios({
        method: "get",
        url: `http://localhost:3000/api/v1/ticket/get`,
        params: isParams,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setTicket(res.data.tickets);
      // console.log(res.data.tickets);
      setErr(false);
      setLoading(false);
    } catch (error) {
      setErr(true);
    }
  }

  useEffect(() => {
    fetchData(selectValue, filterValue);
  }, [selectValue, filterValue]);
  if (loading) {
    return <Loading />;
  }
  if (err) {
    return <Error />;
  }

  const search1 = ticket.filter((ele) =>
    ele.title.toLowerCase().includes("update documentation")
  );

  return (
    <>
      <Container maxW={"1100px"} mb={"100px"} mx={"auto"} pt={10}>
        <Flex mb={10} display={"flex"}>
          <Button
            onClick={() => navigate("/")}
            colorScheme="red"
            variant={"outline"}
          >
            Go To Home
          </Button>
          <Spacer />
          <Box minW={{ base: "auto", md: "400px" }}>
            <Input
              placeholder="Search Ticket by Title..."
              onChange={(e) => SetSearch(e.target.value)}
            />
          </Box>
          <Spacer />
          <Button onClick={() => navigate("/ticket/create")} colorScheme="red">
            Create Ticket
          </Button>
        </Flex>

        <HStack my={8} spacing={10}>
          <Select
            placeholder="Sort by Priority"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Select>
          <Select
            placeholder="Filter by Status"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="process">Open</option>
            <option value="completed">Completed</option>
          </Select>
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"30px"}>
          {ticket
            .filter((ele) => ele.title.toLowerCase().includes(search))
            .map((ele, i) => (
              <TicketCard {...ele} key={i} />
            ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Tickets;
