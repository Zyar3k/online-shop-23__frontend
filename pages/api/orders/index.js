import { createRouter } from "next-connect";
import db from "@/utils/db";
import Order from "@/models/Order";

const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connect();
    const newOrder = new Order({
      ...req.body,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.statusCode(201).send(order);
  } catch (error) {
    res.send({ message: error });
  }
});

export default router.handler({});
