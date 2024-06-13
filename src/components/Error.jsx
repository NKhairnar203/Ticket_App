import React from "react";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
const Error = () => {
  return (
    <Box>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>
    </Box>
  );
};

export default Error;
