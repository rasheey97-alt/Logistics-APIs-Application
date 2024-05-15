import { Request, Response } from "express";
import * as userService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userService.register(username, password);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
