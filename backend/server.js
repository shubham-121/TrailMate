const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./utils/connection.js");

connectToDB();

const verifyJWT = require("./controllers/auth/verifyJWT.js");
const saveTrip = require("./controllers/trips/saveTrip.js");

const tripRoutes = require("./routes/trip.routes.js");
const authRoutes = require("./routes/auth.routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use("/", (req, res) => {
//   return res.status(200).send("API is working , home page");
// });

app.use("/auth", authRoutes);
app.use("/trips", tripRoutes);

//trip save
// app.post("/trips/saveTrip", verifyJWT, saveTrip);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running at PORT: ${PORT}`);
});
