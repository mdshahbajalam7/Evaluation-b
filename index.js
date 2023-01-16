const express = require("express");
const connection = require("./database/db");
require("dotenv").config();
const AuthRouter = require("./router/Auth");
const PostRouter = require("./router/Post");
const cors = require("cors");
const authenticate = require("./middleware/authenticate")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Evalutaion C4");
});

app.use("/auth", AuthRouter);
app.use(authenticate)
app.use("/posts", PostRouter);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`db connection`);
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
// "name": "MD SHAHBAJ ALAM",
// "email": "mdshahbajalam30@gmail.com",
// "gender": "Male",
// "password": "123456"