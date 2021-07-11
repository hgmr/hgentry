import { Button, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { ErrorMessage, Root } from "./styled/Root";
import firebase from "firebase/app";
import "firebase/auth";
import useReactRouter from "use-react-router";
export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onChangeEmail = useCallback((event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  }, []);
  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  }, []);

  const { history } = useReactRouter();

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setIsLoading(false);
    };
  }, []);

  const login = useCallback(() => {
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((credentialUser) => {
        console.log(credentialUser.user);
        setIsLoading(false);
        setPassword("");
        setEmail("");
        if (credentialUser.user?.emailVerified) {
          history.push("/concert-list");
        } else {
          history.push("/mail-verify");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.message === "The email address is badly formatted.") {
          setErrorMessage("Emailアドレスを正しく入力してください。");
        } else if (
          err.message ===
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          setErrorMessage("ユーザが存在しないか、削除されました。");
        } else if (
          err.message ===
          "The password is invalid or the user does not have a password."
        ) {
          setErrorMessage("パスワードが間違っています。");
        } else {
          setErrorMessage(err.message);
        }
        setIsLoading(false);
      });
  }, [email, password, history]);
  return (
    <Root>
      <h1>ログインページ</h1>
      <TextField
        label="Emailアドレス"
        value={email}
        onChange={onChangeEmail}
        variant="outlined"
      />
      <br />
      <br />
      <TextField
        label="パスワード"
        value={password}
        type="password"
        onChange={onChangePassword}
        variant="outlined"
      />
      <br />
      {errorMessage === "" ? undefined : (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      <Button onClick={login} variant="contained" color="primary">
        ログイン
      </Button>
      {isLoading ? "通信中..." : undefined}
    </Root>
  );
}
