const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = (_db) => {
  db = _db;
  return UserModel;
};

class UserModel {
  // sauvegarde d'un membre
  static saveOneUser(req) {
    return bcrypt.hash(req.body.password, saltRounds).then((hash) => {
      console.log("hash", hash);
      return db
        .query(
          'INSERT INTO users (firstName, lastName, email, password, role, phone, creationTimestamp, connexionTimestamp) VALUES (?, ?, ?, ?, "user", ?, NOW(), NOW())',
          [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hash,
            req.body.phone,
          ]
        )
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((err) => {
          return err;
        });
    });
  }

  // récupération d'un utilisateur en fonction de son mail
  static getUserByEmail(email) {
    return db
      .query("SELECT * FROM users WHERE email = ?", [email])
      .then((response) => {
        console.log("getUserByEmail", response);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  // récupération d'un utilisateur en fonction de son id
  static getOneUser(id) {
    return db.query("SELECT * FROM users WHERE id = ?", [id]).then((user) => {
      if (user.length === 0) {
        return {
          status: 401,
          error: "email incorrect",
        };
      } else {
        return user;
      }
    });
  }

  //modification d'un user
  static updateUser(datas, userId) {
    return db
      .query(
        "UPDATE users SET firstName = ?, lastName = ?, password = ?, phone = ? WHERE id = ?",
        [datas.firstName, datas.lastName, datas.password, datas.phone, userId]
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  // suppression d'un user
  static deleteUser(id) {
    return db
      .query("DELETE FROM users WHERE id = ?", [id])
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
