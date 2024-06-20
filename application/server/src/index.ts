import express from "express";
import { createServer } from "http";
import cors from "cors";
import { randomBytes } from "crypto";

const port = 3001;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/login", (req, res) => {
  const callbackUrl = `http://localhost:3000/callback`;
  const redirectUrl = `http://localhost:4000/auth?response_type=code&client_id=${1234}&redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&scope=${encodeURIComponent("read")}&state=${encodeURIComponent("xyz")}`;
  res.redirect(redirectUrl);
});

app.post("/api/auth/callback", async (req, res) => {
  const { code, state } = req.body;
  console.log("Code:", code);
  console.log("State:", state);
  const token = randomBytes(16).toString("hex");
  res.send({ token });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
