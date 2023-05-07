import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
const port = 3000;

const API_URL = "https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode";

//set up the public folder
app.use(express.static(__dirname + "/../public"));

app.get("/api/jokes", async (req: Request, res: Response) => {
  try {
    const amount = Number(req.query.amount) || 10;
    const type = String(req.query.type) || "any";

    if (amount < 5 || amount > 10) {
      res.status(400).json({ error: "Amount must be between 5 and 10" });
      return;
    }

    const allowedTypes = ["any", "single", "twopart"];
    if (!allowedTypes.includes(type.toString())) {
      res
        .status(400)
        .json({ error: "Type must be one of: any, single, twopart" });
      return;
    }

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
  //Send file index.html in /public folder one abote this one
  //one foldere up
  res.sendFile("index.html", { root: __dirname + "/../public" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
