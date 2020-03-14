import * as firebase from "firebase/app";
import { useContext } from "react";
import { AuthContext } from "./auth";
import { useTranslateFunc } from "./hooks/useTranslateFunc";

function login() {
  firebase
    .auth()
    .signInAnonymously()
    .catch(error => {
      console.log(error);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .catch(error => {
      console.log(error);
    });
}

export function AuthButton() {
  const auth = useContext(AuthContext);
  const { t } = useTranslateFunc();

  if (auth.status !== "resolved") {
    return null;
  }

  if (auth.uid) {
    return (
      <button onClick={logout}>
        {t("logout")} {auth.uid}
      </button>
    );
  } else {
    return <button onClick={login}>{t("login")}</button>;
  }
}
