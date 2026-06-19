import { Router } from "express";
import { prisma } from "../prisma";
import { Request, Response } from 'express'

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const page = await prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      res.setHeader("Content-Type", "text/html");
      return res.status(404).send("<h1>404 - Page not found</h1>");
    }

    res.setHeader("Content-Type", "text/html");
    res.send(page.content);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;