import { useContext } from "react";

import CartItem from "@/components/CartItem";
import { CartContext } from "@/context/CartReducer";
import { Box, Text, Stack } from "@chakra-ui/react";

const CartPage = () => {
  const { cart } = useContext(CartContext);
  return (
    <Box>
      {cart?.length === 0 ? (
        <Text fontSize="xl" fontWeight="bold">
          Your Cart is empty
        </Text>
      ) : (
        <>
          <Stack>
            {cart?.length > 0 &&
              cart.map((item) => <CartItem key={item.id} item={item} />)}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default CartPage;
