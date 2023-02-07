import React from "react";
import {
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const OrderSummary = ({ total }) => {
  return (
    <Stack
      spacing={"8"}
      borderWidth="1px"
      rounded="lg"
      padding="8"
      width="full"
    >
      <Heading size="md">Order Summary</Heading>
      <Stack spacing="6">
        <Flex justifyContent="space-between">
          <Heading size="sm">Subtotal</Heading>
          <Heading size="sm">{`£ ${total}`}</Heading>
        </Flex>
      </Stack>
      <Button
        size="lg"
        fontSize="md"
        bg={useColorModeValue("gray.900", "gray.50")}
        color={useColorModeValue("white", "gray.900")}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default OrderSummary;
