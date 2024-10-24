require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./db/connection");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

app.use(
  cors({
    origin: ["http://localhost:5173", "https://bookyst-frontend.vercel.app"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Book store server is running successfully");
});

app.listen(process.env.PORT, () => {
  console.log(`running on the port ${process.env.PORT}`);
});
