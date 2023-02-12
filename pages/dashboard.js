import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Container,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

const DashboardPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (session && !session.user.isAdmin) {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    setLoading(true);
    await fetch("/api/list-orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
    setLoading(false);
  }

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Container>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Orders</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Payment method</Th>
              <Th>Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((order) => (
              <Tr key={order._id}>
                <Td>{order._id}</Td>
                <Td>{order.paymentMethod}</Td>
                <Td>{order.totalPrice}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DashboardPage;
