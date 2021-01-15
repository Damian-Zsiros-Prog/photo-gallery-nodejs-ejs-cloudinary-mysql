const dbConnection = require("../database");

const index = (req, res) => {
  dbConnection.query("SELECT* FROM images", (err, rows) => {
    res.render("index", { images: rows });
  });
};

module.exports = index;
