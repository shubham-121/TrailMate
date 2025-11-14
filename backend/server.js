const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./utils/connection.js");

connectToDB();

const login = require("./controllers/auth/login");
const signup = require("./controllers/auth/signup");
const verifyJWT = require("./controllers/auth/verifyJWT.js");
const homeScreen = require("./controllers/home/homeScreen.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "This is the index route" });
});

// app.get("/signup", signup);
app.post("/signup", signup);

app.post("/login", login);
// app.post("/login", login);

// app.post("/verify", verifyJWT);

app.get("/home", verifyJWT, homeScreen);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at PORT: ${PORT}`);
});
