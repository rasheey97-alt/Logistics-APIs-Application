import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(400).send("Invalid username or password.");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid username or password.");
  }

  const token = jwt.sign({ id: user.id, username: user.username }, "your_jwt_secret", { expiresIn: "1h" });
  res.send({ token });
};
