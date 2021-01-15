const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: process.env.HOST_DB || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.PASS_DB || "",
  database: process.env.NAME_DB || "gallery-nodejs-ejs-cloudinary",
});
 
dbConnection.connect(async (err) => {
  if (!err) {
    console.log("DB is connected");
  } else {
    console.error(err);
  }
});

module.exports = dbConnection;
