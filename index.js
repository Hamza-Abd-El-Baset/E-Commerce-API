const express = require("express");
require("dotenv").config({ path: "config.env" });
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const CustomError = require("./utils/CustomError");
const errorHandler = require("./middlewares/errorHandler");

// Initializing app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => {
  res.send("Main Page");
});
app.use("/api/v1/categories", require("./routes/categoryRoute"));

// Handling Undefined Routes
app.all("*", (req, res, next) => {
  next(new CustomError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Error Handling Middleware
app.use(errorHandler);

const port = process.env.PORT || 8000;
let server;

// Connecting to MongoDB and running app
dbConnect().then(() => {
  server = app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
  });
});

// Handling errors outside express app
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error: ${err.name} => ${err.message}`);
  if (server) {
    server.close(() => {
      console.log("Shutting down...");
      process.exit(1);
    });
  } else {
    console.error("Server has not been initialized");
    process.exit(1);
  }
});
