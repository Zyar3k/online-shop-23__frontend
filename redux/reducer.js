import { HYDRATE } from "next-redux-wrapper";
const initialState = {
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case "address/saveShippingAddress":
      return { ...state, shippingAddress: action.payload };
    default:
      return state;
  }
};
