const { Router } = require("express");
const indexController = require("../controllers/indexController");
const newPhotoControl = require("../controllers/createImageController");
const deleteImageController = require("../controllers/deleteImageController");

const router = Router();

router.get("/", (req, res) => res.redirect("/photos"));
router.get("/photos", indexController);
router
  .route("/photos/new")
  .get((req, res) => res.render("createImage"))
  .post(newPhotoControl);
router.get("/photo/:public_id", deleteImageController)

module.exports = router;
