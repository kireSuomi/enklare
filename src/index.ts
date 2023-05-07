import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const port = 3000;

const API_URL = "https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode";

app.get("/jokes", async (req: Request, res: Response) => {
  try {
    const amount = req.query.amount || 10;
    const type = req.query.type || "any";

    const response = await axios.get(API_URL, {
      params: {
        amount,
        type,
      },
    });

    const jokes = response.data.jokes;

    res.json(jokes);
  } catch (error) {
    console.error("Error fetching jokes:", error);
    res.status(500).json({ error: "Failed to fetch jokes" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, aa!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
