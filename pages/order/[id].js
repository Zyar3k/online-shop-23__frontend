import { useRouter } from "next/router";
import { Progress, Card, CardHeader, CardBody } from "@chakra-ui/react";

const OrderConfirmationPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Progress value={3} max={3} />
      <Card>
        <CardHeader>Thank you for your order!</CardHeader>
        <CardBody>
          <p>Order ID: {id}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderConfirmationPage;
