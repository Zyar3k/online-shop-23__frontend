import React from "react";
import Head from "next/head";
import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import CartIcon from "./CartIcon";

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session, status } = useSession();
  return (
    <div>
      <Head>
        <title>EzzyShop</title>
      </Head>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.600")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex flex={{ base: 1 }} justify={{ base: "start", md: "start" }}>
            <Link href={"/"} passHref>
              <Text
                fontFamily={"heading"}
                color={useColorModeValue("gray.800", "white")}
              >
                EzzyShop
              </Text>
            </Link>
            <Stack
              flex={{ base: 1 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Link href="/cart" passHref>
                <CartIcon />
              </Link>
              {status === "authenticated" ? (
                <Button
                  display={"inline-flex"}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"green.400"}
                  href={"#"}
                  _hover={{ bg: "green.300" }}
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              ) : (
                <>
                  <Button
                    as={"a"}
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                    href={"/login"}
                  >
                    Sign In
                  </Button>

                  <Button
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"green.400"}
                    href={"/signup"}
                    _hover={{ bg: "green.300" }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      {children}
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.600")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderTop={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center" }}
            alignItems={{ base: "center" }}
          >
            <Text
              fontFamily={"heading"}
              color={useColorModeValue("gray.00", "white")}
            >
              Copyright zyar3k @ 2023
            </Text>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Layout;
