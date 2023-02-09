import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";

const shippingAddressSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postCode: Yup.string().required("Postcode is required"),
  country: Yup.string().required("Country is required"),
});

const ShippingAddressForm = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.ShippingAddress);
  const [error, setError] = useState({});
  const [formValues, setFormValues] = useState(
    address
      ? address
      : { fullName: "", address: "", city: "", postCode: "", country: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await shippingAddressSchema.validate(formValues, {
        abortEarly: false,
      });
      console.log(email, password);
    } catch (error) {
      const validationErrors = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(({ path, message }) => {
          validationErrors[path] = message;
        });
      }
      setError(validationErrors);
      return;
    }
    dispatchEvent({ type: "address/saveShippingAddress", payload: formValues });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="fullName">Full Name</FormLabel>
        <Input
          onChange={handleChange}
          value={formValues.fullName}
          placeholder="Jane Doe"
          name="fullName"
        ></Input>
        <FormHelperText color={"red.500"} id="fullName-helper-text">
          {error.fullName}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Input
          onChange={handleChange}
          value={formValues.address}
          placeholder="123 Vauxhall Lane"
          name="address"
        ></Input>
        <FormHelperText color={"red.500"} id="address-helper-text">
          {error.address}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="city">City</FormLabel>
        <Input
          onChange={handleChange}
          value={formValues.city}
          placeholder="Broken City"
          name="city"
        ></Input>
        <FormHelperText color={"red.500"} id="city-helper-text">
          {error.city}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="postCode">Postal Code</FormLabel>
        <Input
          onChange={handleChange}
          value={formValues.postCode}
          placeholder="BR4X8X"
          name="postCode"
        ></Input>
        <FormHelperText color={"red.500"} id="postCode-helper-text">
          {error.postCode}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="country">Country</FormLabel>
        <Select
          onChange={handleChange}
          value={formValues.country}
          placeholder="Select a country"
          name="country"
        >
          <option value="en">England</option>
          <option value="sco">Scotland</option>
          <option value="wal">Wales</option>
          <option value="ni">Northern Ireland</option>
        </Select>
        <FormHelperText color={"red.500"} id="country-helper-text">
          {error.country}
        </FormHelperText>
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
