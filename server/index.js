const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

const mongoURI = process.env.MONGODB_URI;
// 連結MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB", e);
  });

// CORS 配置
const allowedOrigins = ["http://localhost:3000", "https://your-vercel-app-url"];

app.use(
  cors({
    origin: function (origin, callback) {
      // 允許無來源的請求（如 Postman 等工具）
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);

// course route應該被JWT保護
// 如果request header內部沒有JWT，則request就會被視為unauthorized
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

app.listen(8080, () => {
  console.log("後端伺服器正在聆聽port 8080....");
});
