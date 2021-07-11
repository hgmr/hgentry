import { Button } from "@material-ui/core";
import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../../atoms/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { css } from "styled-components";

export function Logout() {
  const isLogin = useRecoilValue(isLoginState);

  const logout = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logout");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      {isLogin ? (
        <Button onClick={logout} variant="contained">
          ログアウト
        </Button>
      ) : undefined}
    </>
  );
}
