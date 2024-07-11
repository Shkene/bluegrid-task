import { Request, Response } from "express";
import { getFilesData } from "../services/files.service";
import { logger } from "../utils/logger";

export async function getFiles(req: Request, res: Response): Promise<void> {
  try {
    const data = await getFilesData();
    res.json(data);
  } catch (error) {
    logger(error);
    res.status(500).json({ message: "Error fetching data" });
  }
}