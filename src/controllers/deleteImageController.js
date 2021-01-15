const dbConnection = require("../database");
const cloudinary = require("cloudinary").v2;

const deleteImage = async (req, res) => {
  const { public_id } = req.params;

  cloudinary.config({
    cloud_name: process.env.IMAGE_CLOUD_NAME,
    api_key: process.env.IMAGE_CLOUD_API_KEY,
    api_secret: process.env.IMAGE_CLOUD_API_SECRET,
  });

  await cloudinary.uploader.destroy(
    public_id,
    (error, result) => { 
      if (!error) {
        dbConnection.query(
          "DELETE FROM images WHERE public_id=?",
          [public_id],
          async (err) => {
            if (!err) {
              res.redirect("/photos");
            } else {
              res.json({
                message: "Error at delete image",
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
module.exports = deleteImage;
