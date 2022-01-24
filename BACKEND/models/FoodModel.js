module.exports = (_db) => {
  db = _db;
  return BeerModel;
};

class BeerModel {
  // récupération des plats
  static getAllFoods() {
    return db
      .query("SELECT * FROM food")
      .then((result) => result)
      .catch((err) => err);
  }

  // récupération d'un plat en fonction de son id
  static getOneFood(id) {
    return db
      .query("SELECT * FROM food WHERE id = ?", [id])
      .then((result) => result)
      .catch((err) => err);
  }

  // sauvegarde d'un plat
  static saveOneFood(req) {
    return db
      .query(
        "INSERT INTO food (title, description, price, image, creationTimestamp) VALUES (?, ?, ?, ?, NOW())",
        [req.body.title, req.body.description, req.body.price, req.body.image]
      )
      .then((result) => result)
      .catch((err) => err);
  }

  // modification d'un plat
  static updateOneFood(req, id) {
    return db
      .query(
        "UPDATE food SET title = ?, description = ?, price = ?, image = ?, WHERE id = ?",
        [
          req.body.title,
          req.body.description,
          req.body.price,
          req.body.image,
          id,
        ]
      )
      .then((result) => result)
      .catch((err) => err);
  }

  // suppression d'un plat
  static deleteOneFood(id) {
    return db
      .query("DELETE FROM food WHERE id = ?", [id])
      .then((result) => result)
      .catch((err) => err);
  }
}
