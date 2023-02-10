import { createRouter } from "next-connect";

const router = createRouter();

router.get(async (req, rest) => {
  rest.sendDate({ clientId: process.env.PAYPAL_CLIENT_ID || "test" });
});

export default router.handler({});
