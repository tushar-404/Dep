import { Router } from "express";
import { randomBytes } from "crypto";
import { prisma } from "../prisma";
import { Request, Response } from "express"

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { htmlContent } = req.body;

    if (!htmlContent) {
      return res.status(400).json({
        error: "HTML content is required",
      });
    }

    const id = randomBytes(4).toString("hex");
    const editToken = randomBytes(16).toString("hex");

    await prisma.page.create({
      data: {
        id,
        content: htmlContent,
        editToken,
      },
    });

    return res.json({
      id,
      editToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to deploy HTML",
    });
  }
});

export default router;