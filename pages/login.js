import { useState } from "react";
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
  FormHelperText,
} from "@chakra-ui/react";
import Link from "next/link";
import * as yup from "yup";

let loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 char")
    .required("Password is required"),
  name: yup.string().required(),
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(
        {
          password,
          email,
        },
        {
          abortEarly: false,
        }
      );
    } catch (error) {
      const validationErrors = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach(({ path, message }) => {
          validationErrors[path] = message;
        });
      }
      setError(validationErrors);
      return;
    }
  };

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
            <Link passHref href="/signup">
              <Button variant="link" colorScheme="green">
                Sign up
              </Button>
            </Link>
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
        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <Stack spacing="6">
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <FormHelperText color={"red.500"} id="email-helper-text">
                  {error.email}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <FormHelperText color={"red.500"} id="password-helper-text">
                  {error.password}
                </FormHelperText>
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Button variant="green" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack>
              <Button colorScheme="green" type="submit">
                Login
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
