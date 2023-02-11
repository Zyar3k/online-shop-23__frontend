import { createRouter } from "next-connect";
import db from "@/utils/db";
import Order from "@/models/Order";

const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connect();
    const order = new Order.findById(req.query.id);
    if (order) {
      order.isPaid = true;
      order.paymentId = req.body.payment_id;
      order.paymentEmail = req.body.email_address;
      order.paymentStatus = req.body.status;
    }
    const completedOrder = await order.save();
    await db.disconnect();
    res
      .statusCode(201)
      .send({ message: "Order completed", order: completedOrder });
  } catch (error) {
    res.send({ message: error });
  }
});

export default router.handler({});
