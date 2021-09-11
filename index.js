const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// required routes
const usersRouters = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const postsRoutes = require("./routes/posts.routes");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

const app = express();

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// routes
app.use("/api/users", usersRouters);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.listen(3000, () => {
  console.log("Server on port 3000");
});
