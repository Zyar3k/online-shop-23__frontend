import User from "@/models/User";
import db from "@/utils/db";
import { hashPassword } from "@/utils/auth";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { name, email, password } = data;

  if (
    !email ||
    !email.incudes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    req.status(422).json({
      message: "Invalid input",
    });
    return;
  }

  await db.connect();
  const existUser = await User.findOne({ email: email });

  if (existUser) {
    res.status(422).json({
      message: "User already exist",
    });
    db.disconnect();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await User.create({
    email: email,
    password: hashedPassword,
    name: name,
  });

  res.status(201).json({ message: "User created!" });
  db.disconnect();
}

export default handler;
