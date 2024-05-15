import { Request, Response } from "express";
import { Package } from "../models/Package";
import { User } from "../models/User";

export const createPackage = async (req: Request, res: Response) => {
  const { name, status, pickUpDate } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findOne(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const newPackage = new Package();
    newPackage.name = name;
    newPackage.status = status;
    newPackage.pickUpDate = pickUpDate;
    newPackage.user = user;
    await newPackage.save();

    res.status(201).send(newPackage);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const trackPackage = async (req: Request, res: Response) => {
  const packageId = req.params.id;
  try {
    const package = await Package.findOne(packageId, { relations: ["user"] });
    if (!package) {
      return res.status(404).send("Package not found.");
    }
    res.send(package);
  } catch (error) {
    res.status(400).send(error);
  }
};
