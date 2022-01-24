const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "pitichat";
const withAuth = require("../withAuth");

module.exports = (app, db) => {
  const userModel = require("../models/UserModel")(db);

  // enregistrement d'un membre
  app.post("/api/v1/user/save", async (req, res, next) => {
    let check = await userModel.getUserByEmail(req.body.email);
    //console.log('check',check[0].email)
    if (check.length > 0) {
      if (check[0].email === req.body.email) {
        res.json({ status: 401, msg: "Email déjà utilisé!" });
      }
    }

    let user = await userModel.saveOneUser(req);

    if (user.code) {
      res.json({ status: 500, msg: "il y a eu un problème !", result: user });
    }
    res.json({ status: 200, msg: "l'utilisateur a bien été enregistré" });
  });

  // gestion de la connexion des membres (c'est ici qu'on va créer le token et l'envoyer vers le front)
  app.post("/api/v1/user/login", async (req, res, next) => {
    let user = await userModel.getUserByEmail(req.body.email);

    if (user.length === 0) {
      res.json({ status: 404, msg: "Pas d'utilisateur avec ce mail" });
    }

    // on teste les mot de passe
    bcrypt.compare(req.body.password, user[0].password).then((same) => {
      console.log("same", same);
      if (same === true) {
        //dans payload on stock les valeur qu'on va glisser dans le token (attention jamais d'infos sensibles)
        const payload = { email: req.body.email, id: user[0].id };
        //on crée le token avec sa signature secret
        const token = jwt.sign(payload, secret);
        console.log("token", token);
        res.json({
          status: 200,
          token: token,
          user: user[0],
        });
      } else {
        res.json({ status: 401, error: "Votre mot de passe est incorrect" });
      }
    });
  });

  //modification des utilisateurs
  app.put("/api/v1/user/update/:id", withAuth, async (req, res, next) => {
    let check = await userModel.getUserByEmail(req.body.email);
    let datas = req.body;
    console.log("check", check[0].password, "req.body", req.body.password);
    if (check[0].password !== req.body.password) {
      console.log("password mismatched");
      bcrypt.hash(req.body.password, saltRounds).then(async (hash) => {
        console.log("hash", hash);
        datas.password = hash;
        console.log("datas with hash", datas);
        let user = await userModel.updateUser(datas, req.params.id);
        console.log("user updated", user);

        if (user.code) {
          res.json({ status: 500, msg: "gros pb", err: user });
        }
      });
    } else {
      console.log("datas", datas);
      let user = await userModel.updateUser(datas, req.params.id);

      console.log("user updated", user);

      if (user.code) {
        res.json({ status: 500, msg: "gros pb", err: user });
      }
    }
    let newUser = await userModel.getOneUser(req.params.id);
    console.log("newUser", newUser);
    if (newUser.code) {
      res.json({ status: 500, msg: "gros pb", err: newUser });
    }

    res.json({ status: 200, newUser: newUser[0] });
  });

  app.delete("/api/v1/user/delete/:id", withAuth, async (req, res, next) => {
    let user = await userModel.deleteUser(req.params.id);

    if (user.code) {
      res.json({ status: 500, msg: "gros pb", err: user });
    }
    res.json({ status: 200, result: user });
  });
};
