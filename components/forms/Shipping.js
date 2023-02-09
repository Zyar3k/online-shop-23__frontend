import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Button,
} from "@chakra-ui/react";

const ShippingAddressForm = () => {
  return (
    <form>
      <FormControl>
        <FormLabel htmlFor="fullName">Full Name</FormLabel>
        <Input placeholder="Jane Doe" name="fullName"></Input>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Input placeholder="123 Vauxhall Lane" name="address"></Input>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="city">City</FormLabel>
        <Input placeholder="Broken City" name="city"></Input>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
        <Input placeholder="BR4X8X" name="postalCode"></Input>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="country">Country</FormLabel>
        <Select placeholder="Select a country" name="country">
          <option value="en">England</option>
          <option value="sco">Scotland</option>
          <option value="wal">Wales</option>
          <option value="ni">Northern Ireland</option>
        </Select>
      </FormControl>
      <Flex display="flex" justifyContent="flex-end">
        <Button type="submit" mt={4}>
          Continue
        </Button>
      </Flex>
    </form>
  );
};

export default ShippingAddressForm;
