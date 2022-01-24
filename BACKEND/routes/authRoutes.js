// routes permettant la gestion de la connexion par token
const withAuth = require("../withAuth");
// routes permettant la gestion de la connexion par token
module.exports = function (app, db) {
  const UserModel = require("../models/UserModel")(db);
  // test des tokens
  app.get("/api/v1/user/checkToken", withAuth, async (req, res, next) => {
    console.log("recup du payload dans ma route", req.id);
    //récupération des infos de l'utilisateur par son id
    let user = await UserModel.getOneUser(req.id);
    if (user.code) {
      res.json({ status: 500, err: user });
    }
    //on retourne les infos vers le front
    res.json({ status: 200, msg: "Authentification réussie", user: user });
  });
};
