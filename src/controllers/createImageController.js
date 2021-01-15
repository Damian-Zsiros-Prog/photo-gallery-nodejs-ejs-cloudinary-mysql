const dbConnection = require("../database");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const createImageController = async (req, res) => {
  const { title, description } = req.body;
  const { path } = req.file;

  cloudinary.config({
    cloud_name: process.env.IMAGE_CLOUD_NAME,
    api_key: process.env.IMAGE_CLOUD_API_KEY,
    api_secret: process.env.IMAGE_CLOUD_API_SECRET,
  });
  const photoCloudinary = await cloudinary.uploader.upload(
    path,
    (error, result) => {
      if (!error) {
        dbConnection.query(
          "INSERT INTO images (title,description,imagePath,public_id) VALUES(?,?,?,?)",
          [title, description, result.url, result.public_id],
          async (err) => {
            if (!err) {
              await fs.unlinkSync(path);
              res.redirect("/photos");
            } else {
              res.json({
                message: "Error at create image",
              });
              console.error(err);
            }
          }
        );
      } else {
        console.error(error);
      }
    }
  );
};

module.exports = createImageController;
