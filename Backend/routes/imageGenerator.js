const express = require("express");
const axios = require("axios");
const router = express.Router();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

// POST /api/generate-image
router.post("/generate-image", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
        responseType: 'arraybuffer',
      }
    );

    const imageBuffer = Buffer.from(response.data, "binary").toString("base64");
    res.json({ image: `data:image/png;base64,${imageBuffer}` });
  } catch (err) {
    console.error("Image generation error:", err.message);
    res.status(500).json({ error: "Image generation failed" });
  }
});

module.exports = router;
