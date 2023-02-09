import { useContext } from "react";
import { useSelector } from "react-redux";
import {
  Heading,
  Box,
  Stack,
  StackDivider,
  Test,
  Flex,
  Button,
} from "@chakra-ui/react";
import { CartContext } from "@/context/CartContext";

const OrderReview = () => {
  const { cart } = useContext(CartContext);
  const state = useSelector((state) => state);

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = itemsPrice * 0.15;
  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalPrice = shippingPrice + taxPrice + itemsPrice;

  return (
    <Stack divider={<StackDivider />} spacing="4">
      <Box>
        <Heading size="xs" textTransform={"uppercase"}>
          Shipping Address
        </Heading>
        <Text pt="2" fontSize="sm">
          {state.shippingAddress.fullName}
        </Text>
        <Text pt="2" fontSize="sm">
          {state.shippingAddress.address}
        </Text>
        <Text pt="2" fontSize="sm">
          {state.shippingAddress.city} {state.shippingAddress.postcode}
        </Text>
        <Text pt="2" fontSize="sm">
          {state.shippingAddress.country}
        </Text>
      </Box>
      <Box>
        <Heading size="xs" textTransform={"uppercase"}>
          Payment Method
        </Heading>
        <Text pt="2" fontSize="sm">
          {state.shippingAddress.paymentMethod
            ? state.shippingAddress.paymentMethod
            : "PayPal"}
        </Text>
      </Box>
    </Stack>
  );
};

export default OrderReview;
