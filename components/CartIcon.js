import { CartContext } from "@/context/CartReducer";
import { Box, useColorMode, IconButton, Text } from "@chakra-ui/react";
import { useContext } from "react";

const CartIcon = () => {
  const { cart } = useContext(CartContext);
  const { colorMode } = useColorMode();
  const hoverColor = { light: "gray.800", dark: "gray.100" };
  const iconColor = { light: "gray.600", dark: "gray.300" };
  const fontColor = { light: "gray.800", dark: "gray.100" };
  return (
    <Box position="relative">
      <IconButton
        aria-label="cart"
        icon={<Text fontSize="2xl">🛒</Text>}
        variant="ghost"
        color={iconColor[colorMode]}
        _hover={hoverColor[colorMode]}
      />
      {cart.length > 0 && (
        <Box
          position="absolute"
          top={0}
          right={0}
          bg={hoverColor[colorMode]}
          color={fontColor[colorMode]}
          rounded="sm"
          p={1}
        >
          <Text fontWeight="bold">{cart.length}</Text>
        </Box>
      )}
    </Box>
  );
};

export default CartIcon;