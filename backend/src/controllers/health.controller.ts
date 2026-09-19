import { Request, Response } from "express";

export class HealthController {
  static async health(req: Request, res: Response) {
    return res.status(200).json({ status: "ok" });
  }
}
