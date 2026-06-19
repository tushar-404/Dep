import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { htmlContent, editToken } = req.body;

    const page = await prisma.page.findUnique({
      where: { id },
    });

    if (!page) {
      return res.status(404).json({
        error: "Page not found",
      });
    }

    if (page.editToken !== editToken) {
      return res.status(401).json({
        error: "Invalid edit token",
      });
    }

    await prisma.page.update({
      where: { id },
      data: {
        content: htmlContent,
      },
    });

    return res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to update page",
    });
  }
});

export default router;