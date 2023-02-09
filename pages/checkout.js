import React from "react";
import ShippingAddressForm from "@/components/forms/Shipping";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Progress,
  Stack,
} from "@chakra-ui/react";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.currentStep);

  const steps = [
    { name: "Shipping", component: <ShippingAddressForm /> },
    { name: "Payment", component: <div>Payment</div> },
    { name: "Review", component: <div>Review</div> },
  ];
  return (
    <Stack spacing={4}>
      <Progress value={activeStep} max={steps.length} />
      <Box mx="auto">
        <Card w="xl" m="auto">
          <CardHeader>
            <Heading>{steps[activeStep].name}</Heading>
          </CardHeader>
          <CardBody>{steps[activeStep].component}</CardBody>
        </Card>
      </Box>
    </Stack>
  );
};

export default CheckoutPage;
