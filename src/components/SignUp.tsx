import { Button, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { ErrorMessage, Root } from "./styled/Root";
import useReactRouter from "use-react-router";
export function SignUp() {
  const [email, setEmail] = useState<string>("");
  const onChangeEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);
  const [password, setPassword] = useState<string>("");
  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { history } = useReactRouter();

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setIsLoading(false);
    };
  }, []);
  const signUp = useCallback(() => {
    setIsLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        firebase
          .auth()
          .currentUser?.sendEmailVerification({
            url: "https://hgentry.web.app/login",
          })
          .then(() => {
            setIsLoading(false);
            setPassword("");
            setEmail("");
            history.push("/mail-verify");
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
            setPassword("");
            setErrorMessage(err.message);
            setEmail("");
          });
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        if (err.message === "The email address is badly formatted.") {
          setErrorMessage("Emailアドレスが違います");
        } else if (err.message === "Password should be at least 6 characters") {
          setErrorMessage("パスワードは最低6文字必要です");
        } else if (
          err.message ===
          "The email address is already in use by another account."
        ) {
          setErrorMessage("そのメールアドレスは既に登録されています");
        } else {
          setErrorMessage(err.message);
        }
      });
  }, [email, password, history]);

  return (
    <Root>
      <h1>新規登録</h1>
      <TextField
        label="Email"
        value={email}
        variant="outlined"
        onChange={onChangeEmail}
      />
      <br />
      <TextField
        value={password}
        label="パスワード"
        type="password"
        variant="outlined"
        onChange={onChangePassword}
      />
      <br />
      {errorMessage === "" ? undefined : (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      <Button onClick={signUp} variant="contained" color="primary">
        登録する
      </Button>
      {isLoading ? "通信中..." : undefined}
    </Root>
  );
}
