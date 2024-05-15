import cron from "node-cron";
import { Package } from "../models/Package";

export const updatePackageStatus = () => {
  cron.schedule("*/2 * * * *", async () => {
    const packages = await Package.find();
    packages.forEach(async pkg => {
      if (pkg.status !== "Delivered") {
        pkg.status = "In Transit"; // Example status update
        await pkg.save();
      }
    });
    console.log("Package statuses updated.");
  });
};
