import { useContext } from "react";
import {
  Flex,
  Stack,
  Image,
  Box,
  Text,
  useColorModeValue,
  CloseButton,
} from "@chakra-ui/react";
import { CartContext } from "@/context/CartReducer";

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <Stack direction={"row"} spacing="5" width="full">
        <Image
          src={`/images${item.image}`}
          alt={item.title}
          width="120px"
          height="120px"
          loading="lazy"
        />
        <Box pt="4" display="flex" width="full">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{item.title}</Text>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {item.description}
            </Text>
          </Stack>
          <Flex width="full" justify="space-between" display="flex">
            <Text
              fontWeight={"medium"}
              fontSize="lg"
              color={useColorModeValue("gray.800", "gray.200")}
            >
              £{item.price}
            </Text>
            <CloseButton onClick={() => removeFromCart(item.id)} />
          </Flex>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CartItem;