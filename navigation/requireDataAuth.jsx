import React, { useEffect } from "react";
import LoggedRoutes from "./LoggedRoutes";
import NotLoggedRoutes from "./NotLoggedRoutes";
import { checkToken, getData } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "../slices/userSlice";

const RequireAuthData = () => {
  let dispatch = useDispatch();
  let user = useSelector(selectUser);

  useEffect(() => {
    //on récup le token (fonction api) qu'on stock dans une variable isToken
    getData()
      .then((isToken) => {
        //si l'utilisateur n'est pas connecté et que le token n'est pas undefined
        if (user.isLogged === false && isToken !== undefined) {
          //appel de la fonction pour vérifier le token
          checkToken()
            .then((response) => {
              //si le status de la reponse est 200
              if (response.data.status === 200) {
                //appel de l'action de connexion de l'user à redux
                dispatch(setUser(response.data.user));
              } else {
                console.log("Echec tentative de connexion");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (user.isLogged) {
    return <LoggedRoutes />;
  } else {
    return <NotLoggedRoutes />;
  }
};

export default RequireAuthData;
