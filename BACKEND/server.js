const express = require("express");
const app = express();

const mysql = require("promise-mysql");
const cors = require("cors");
app.use(cors());
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//parse les url
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//on check si il l'api est en ligne ou non et on décide quelle bdd on récupère
if (process.env.HOST_DB) {
  var config = require("./config-exemple");
} else {
  var config = require("./config");
}

// toutes mes routes
const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

// connexion BDD
const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
// const port = process.env.PORT || config.db.port; //si vous êtes sur mac le port 8889

console.log(host, database, user, password);

mysql
  .createConnection({
    host: host,
    database: database,
    user: user,
    password: password,
    //port: port
  })
  .then((db) => {
    console.log("connecté bdd");
    setInterval(async function () {
      let res = await db.query("SELECT 1");
    }, 10000);

    app.get("/", (req, res, next) => {
      res.json({ status: 200, results: "welcome to api" });
    });
    // toutes les routes sont dans des modules
    foodRoutes(app, db);
    userRoutes(app, db);
    authRoutes(app, db);
    orderRoutes(app, db);
  });

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("listening port " + PORT + " all is ok");
});
