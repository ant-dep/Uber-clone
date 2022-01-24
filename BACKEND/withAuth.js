const jwt = require("jsonwebtoken");
const secret = "pitichat";

const withAuth = (req, res, next) => {
  //on récupère notre token dans le header de la requète HTTP
  const token = req.headers["x-access-token"];
  //si il ne le trouve pas
  if (token === undefined) {
    //renvoi d'une erreur
    res.json({
      status: 404,
      msg: "token not found",
    });
  } else {
    //sinon (trouvé) utilisation de la fonction de vérification de jsonwebtoken.
    jwt.verify(token, secret, (err, decoded) => {
      //si il y'a une erreur envoi d'une rep d'erreur
      if (err) {
        res.json({
          status: 401,
          msg: "error, your token is invalid",
        });
        //sinon envoi de l'id décodé dans le payload du token
      } else {
        req.id = decoded.id;
        console.log("payload", decoded);
        //on sort de la fonction et va autoriser la callback de la route à s'exécuter
        next();
      }
    });
  }
};
module.exports = withAuth;
