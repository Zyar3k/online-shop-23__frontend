import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Heading,
  Box,
  Stack,
  StackDivider,
  Text,
  Flex,
  Button,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import { CartContext } from "@/context/CartContext";

const OrderReview = () => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [displayPaypalButtons, setDisplayPaypalButtons] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(false);
  const { cart } = useContext(CartContext);
  const state = useSelector((state) => state);

  const toast = useToast();

  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = itemsPrice * 0.15;
  const totalPrice = shippingPrice + taxPrice + itemsPrice;

  const handlePlaceOrder = () => {
    setDisplayPaypalButtons(true);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      // TODO changes in db
      console.log(details);
      setIsPaid(true);
      toast({
        title: "Payment successful",
        description: "Thank you for your order",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  const onError = (error) => {
    setError(true);
    toast({
      title: "Something went wrong",
      description: "Payment failed",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };
  useEffect(() => {
    if (displayPaypalButtons) {
      const loadPaymentScript = async () => {
        const response = await fetch("/api/keys/paypal", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { clientId } = await response.json();
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "GBP",
          },
        });
      };
      loadPaymentScript();
    }
  }, [displayPaypalButtons]);
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
      <Box>
        <Heading size="xs" textTransform={"uppercase"}>
          Order summary
        </Heading>
        <Text pt="2" fontSize="sm">
          Items: £{itemsPrice}
        </Text>
        <Text pt="2" fontSize="sm">
          Shipping: £{shippingPrice}
        </Text>
        <Text pt="2" fontSize="sm">
          Tax: £{taxPrice}
        </Text>
        <Text pt="2" fontSize="sm">
          Total: £{totalPrice}
        </Text>
      </Box>
      <Flex justify="center" align="center">
        {displayPaypalButtons ? (
          isPending ? (
            <CircularProgress isIndeterminate color="blue.500" />
          ) : (
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          )
        ) : (
          <Button colorScheme="blue" size="sm" onClick={handlePlaceOrder}>
            Place order
          </Button>
        )}
      </Flex>
    </Stack>
  );
};

export default OrderReview;
