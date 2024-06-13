import React from 'react'
import { Box, Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <>
      <Center mt={40} width={"100%"} >
        <Spinner color="red.500" />
      </Center>
    </>
  );
}

export default Loading