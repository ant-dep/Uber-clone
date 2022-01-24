const withAuth = require("../withAuth");

module.exports = function (app, db) {
  const orderModel = require("../models/OrderModel")(db);
  const foodModel = require("../models/FoodModel")(db);

  // route de récupération des orders
  app.get("/api/v1/orders", withAuth, async (req, res) => {
    // récupération des orders
    let orders = await orderModel.getAllOrders(req.id);

    if (orders.code) {
      res.json({ status: 500, err: orders });
    }

    // boucle pour récupérer les ordersDetails (surtout les plats)
    for (let i = 0; i < orders.length; i++) {
      let ordersDetails = await orderModel.getOneOrderDetails(orders[i].id);
      // boucle pour récupérer les infos des plats concernés
      for (let j = 0; j < ordersDetails.length; j++) {
        let foodDetails = await foodModel.getOneFood(ordersDetails[j].food_id);
        // on remplace les ordersDetails par les infos des plats directement
        ordersDetails[j].food = foodDetails[0];
      }
      // on ajoute la ligne details contenant les plats à chaque orders
      orders[i].details = ordersDetails;
    }
    console.log("ordersUpdated", orders);
    // on renvoie le tout
    res.json({ status: 200, orders });
  });

  //route de sauvegarde d'une commande
  app.post("/api/v1/order", withAuth, async (req, res) => {
    //on initialise un montant total à 0
    let totalAmount = 0;
    // enregistrement de l'order
    let orderInfos = await orderModel.saveOneOrder(req, totalAmount);

    if (orderInfos.code) {
      res.json({ status: 500, msg: orderInfos });
    }
    //on récupère l'id du nouvel élément qui vient d'être ajouté (insertId)
    let id = orderInfos.insertId;
    // enregistrement des orderdetails (boucle sur le panier (req.body.cart)
    req.body.cart.map(async (b, index) => {
      //récup des infos de la bière par son id (fonction)
      let food = await foodModel.getOneFood(b.id);
      if (food.code) {
        res.json({ status: 500, msg: food });
      }
      //on stock dans l'objet une nouvelle propriété du prix
      b.safePrice = parseFloat(food[0].price);
      //appel de la fonction d'enregistrement du détail de la bière
      let detail = await orderModel.saveOneOrderDetail(id, b);
      if (detail.code) {
        res.json({ status: 500, msg: detail });
      }
      //calcul du prix total pour ce produit par rapport à la quantité demandée
      totalAmount += parseInt(b.quantityInCart) * parseFloat(b.safePrice);
      //appel de la fonction de mise à jour du montant total
      let update = await orderModel.updateTotalAmount(id, totalAmount);
      if (update.code) {
        res.json({ status: 500, msg: update });
      }
    });
    //rep json positive en retournant l'id de la commande
    res.json({ status: 200, orderId: id });
  });

  //route de validation du paiement dans un order
  app.put("/api/v1/order/validate", withAuth, async (req, res, next) => {
    //mise à jour du status du paiement de la commande
    let validate = await orderModel.updateStatus(
      req.body.orderId,
      req.body.status
    );
    if (validate.code) {
      res.json({ status: 500, msg: validate });
    }
    //rep json positive
    res.json({ status: 200, msg: "paiement validé" });
  });
};
