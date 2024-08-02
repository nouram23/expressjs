const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const colors = require("colors");
const errorHandler = require("./middleware/error");

// Implement Routes
const usersRoute = require("./routes/usersRoute");
const orderRoute = require("./routes/ordersRoute");
const carRoute = require("./routes/carRoute");
// Include configuration process
dotenv.config({ path: "./config/config.env" });

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red",
});

app.use("/api/v1/user", usersRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/car", carRoute);

app.use(errorHandler);
module.exports.handler = serverless(app);

// const server = app.listen(process.env.PORT, () => {
//   console.log(colors.rainbow(`Up && Running *${process.env.PORT}`));
// });

// process.on("unhandledRejection", (err, promise) => {
//   console.log(colors.red.underline(`Алдаа гарлаа: ${err.message}`));
//   server.close(() => {
//     process.exit(1);
//   });
// });
