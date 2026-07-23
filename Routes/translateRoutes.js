import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(
      "https://translate.argosopentech.com/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: "auto",
          target: "en",
        }),
      }
    );

    const data = await response.json();

    console.log("Translation:", data);

    res.json(data);
  } catch (error) {
    console.log("translate error", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;