const fs = require("fs");
const withAuth = require("../withAuth");

module.exports = (app, db) => {
  const foodModel = require("../models/FoodModel")(db);
  // route permettant de récupérer toutes les bières
  app.get("/api/v1/foods", async (req, res) => {
    let foods = await foodModel.getAllFoods();
    if (foods) {
      res.json(foods);
    } else {
      res.status(404).send("No food found");
    }
  });
  // route permettant de récupérer une bières en fonction de son id
  app.get("/api/v1/foods/:id", async (req, res) => {
    const food = await foodModel.getOnefood(req.params.id);
    if (food) {
      res.json(food);
    } else {
      res.status(404).send("No food found");
    }
  });
  // route permettant d'enregister une bières
  app.post("/api/v1/foods", withAuth, async (req, res) => {
    const food = await foodModel.saveOneFood(req);
    if (food) {
      res.json(food);
    } else {
      res.status(500).send("unable to add this one");
    }
  });
  // route permettant d'enregister une photo une bières
  app.post("/api/v1/food/pict", withAuth, async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.json({ status: 400, msg: "Can't get the picture" });
    }

    req.files.image.mv("public/images/" + req.files.image.name, function (err) {
      console.log("ça passe", "/public/images/" + req.files.image.name);
      if (err) {
        res.json({ status: 500, msg: "Can't save the picture" });
      }
    });

    res.json({ status: 200, msg: "ok", url: req.files.image.name });
  });

  // route permettant de modifier une bières
  app.put("/api/v1/foods/update/:id", withAuth, async (req, res) => {
    console.log(req.params.id, req.body);
    const food = await foodModel.updateOneFood(req, req.params.id);
    if (food) {
      res.json({ status: 200, food });
    } else {
      res.status(500).send("unable to update this one");
    }
  });
  // route permettant de supprimer une bières
  app.delete("/api/v1/foods/delete/:id", withAuth, async (req, res) => {
    //on récupère la bière par rapport à son id
    const food = await foodModel.getOnefood(req.params.id);
    //on supprime la bière dans la bdd
    const deletedfood = await foodModel.deleteOneFood(req.params.id);
    //si la photo de la bière n'était pas no-pict.jpg
    if (food[0].photo !== "no-pict.jpg") {
      //suppression de l'image avec la fonction unlink du module fs
      fs.unlinkSync(`public/images/${food[0].photo}`)
        //si il y'a une erreur
        .catch((err) => {
          //reponse json d'erreur
          res.json({ status: 500, msg: "Can't delete that picture" });
        });
      //rep json que l'article est bien supprimé
      res.json({ status: 200, msg: "Dish deleted" });
    }
  });
};
