import {
  Box,
  Button,
  Container,
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Text,
  Grid,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const TicketCard = ({ _id, title, discription, assignee, status, priority }) => {
  const navigate = useNavigate();
  return (
    <>
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
                Priority
              </Heading>
              <Text pt="2" fontSize="sm">
                {priority}
              </Text>
            </Box>
            <Box>
              <Flex>
                <Button
                  onClick={() => navigate(`/ticket/view/${_id}`)}
                  colorScheme="green"
                >
                  View Ticket
                </Button>
              </Flex>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default TicketCard;
