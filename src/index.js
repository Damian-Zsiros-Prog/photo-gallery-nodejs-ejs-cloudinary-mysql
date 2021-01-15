const express = require("express");
const path = require("path");
const helmet = require("helmet");
const router = require("./routes/image.routes");
const dotenv = require("dotenv");
const compression = require("compression");
const morgan = require("morgan");
const multer = require("multer");
const { v4 } = require("uuid");
const cloudinary = require("cloudinary").v2;

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 5000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
