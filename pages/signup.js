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
import { signIn } from "next-auth/react";

let signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required field"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 char")
    .required("Password is required"),
});

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUpSchema.validate(
        {
          email,
          password,
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

    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          console.log("User created successfully");
          signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "/",
            redirect: true,
          })
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              setError({ api: error.toString() });
            });
        } else {
          console.log("User creation failed");
          setError({ api: "Could not create an account. Please try later" });
        }
      })
      .catch((error) => console.log("error", error));

    setEmail("");
    setPassword("");
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Heading>Create an account</Heading>
          <HStack spacing="1" textAlign="center">
            <Text>Already have an account?</Text>
            <Link passHref href="/login">
              <Button variant="link" colorScheme="green">
                Sign in
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
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <Input
                  value={name}
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                ></Input>
                <FormHelperText color={"red.500"} id="name-helper-text">
                  {error.name}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  value={email}
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
                  value={password}
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <FormHelperText color={"red.500"} id="password-helper-text">
                  {error.password}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack>
              <Button colorScheme="green" type="submit">
                Signup
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
