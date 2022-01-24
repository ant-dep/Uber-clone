module.exports = (_db) => {
  db = _db;

  return OrderModel;
};

class OrderModel {
  //validation d'une commande
  static saveOneOrder(req, totalAmount) {
    return db
      .query(
        'INSERT INTO orders (user_id, totalAmount, restaurantName, restaurantImage, restaurantCity, creationTimestamp, status) VALUES (?,?, ?, ?, ?, NOW(),"not paid")',
        [
          req.id,
          totalAmount,
          req.body.restaurantName,
          req.body.restaurantImage,
          req.body.restaurantCity,
        ]
      )
      .then((result) => {
        console.log("result", result);
        return result;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  }

  // sauvegarde d'un orderdetail
  static saveOneOrderDetail(order_id, food) {
    let total = parseInt(food.quantityInCart) * parseFloat(food.safePrice);
    return db
      .query(
        "INSERT INTO orderdetails (order_id, food_id, quantity, total) VALUES (?, ?, ? ,?)",
        [order_id, food.id, food.quantityInCart, total]
      )
      .then((result) => {
        console.log("result", result);
        return result;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  }

  // modification d'un montant total
  static updateTotalAmount(order_id, totalAmount) {
    return db
      .query("UPDATE orders SET totalAmount = ? WHERE id=?", [
        totalAmount,
        order_id,
      ])
      .then((result) => {
        console.log("result", result);
        return result;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  }

  // récupération de toutes les commandes
  static getAllOrders(user_id) {
    return db
      .query(
        "SELECT * FROM orders WHERE user_id =? ORDER BY creationTimestamp DESC",
        [user_id]
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  }

  // récupération d'une commande en fonction d'un id
  static getOneOrder(id) {
    return db
      .query("SELECT * FROM orders WHERE id =?", [id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  }

  // récupération d'un orderdetail en fonction d'un id
  static getOneOrderDetails(order_id) {
    return db
      .query("SELECT * FROM orderdetails WHERE order_id =?", [order_id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  }

  // modification du status d'une commande
  static updateStatus(orderId, status) {
    return db
      .query("UPDATE orders SET status =? WHERE id =?", [status, orderId])
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  }
}
