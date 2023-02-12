import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect(products);

  res.send(products);
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
