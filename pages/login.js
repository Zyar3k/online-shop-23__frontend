import React from "react";
import {
  Container,
  Stack,
  Heading,
  HStack,
  Text,
  Button,
  Box,
  FormLabel,
  FormControl,
  Input,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

const Login = () => {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Heading>Log in to your account</Heading>
          <HStack spacing="1" textAlign="center">
            <Text>Don&apos;t have an account?</Text>
            <Button variant="link" colorScheme="green">
              Sign up
            </Button>
          </HStack>
        </Stack>
      </Stack>
      <Box
        px={{ base: "4", sm: "10" }}
        py={{ base: "0", sm: "8" }}
        borderRadius={{ base: "none", sm: "xl" }}
        boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
        bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
      >
        <Stack spacing="6">
          <Stack spacing="6">
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input id="email" type="email"></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password"></Input>
            </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Button variant="green" size="sm">
              Forgot password?
            </Button>
          </HStack>
          <Stack>
            <Button colorScheme="green">Log in</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
