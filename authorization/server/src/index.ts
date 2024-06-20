import express from "express";
import { createServer } from "http";
import cors from "cors";

const port = 4001;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (username === "1" && password === "1") {
    res.send({ message: "Login success" });
  } else {
    res.status(401).send({ message: "Login failed" });
  }
});

app.post("/api/auth", (req, res) => {
  const { client_id, redirect_uri, scope, state } = req.body;
  const code = "abc";
  const redirectUrl = `${redirect_uri}?code=${code}&state=${state}`;
  res.send({ redirectUrl });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
