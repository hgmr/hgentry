import { Button, RootRef } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { ErrorMessage, Root } from "./styled/Root";
import firebase from "firebase/app";
import useReactRouter from "use-react-router";
export function MailVerify() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const resendEmail = useCallback(() => {
    setIsLoading(true);
    firebase
      .auth()
      .currentUser?.sendEmailVerification({
        url: "https://hgentry.web.app/login",
      })
      .then((result) => {
        setIsLoading(false);
        setSent(true);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        if (
          error.message ===
          "We have blocked all requests from this device due to unusual activity. Try again later."
        ) {
          setErrorMessage("もう少し待ってから送信してください");
        } else {
          setErrorMessage("メール再送に失敗しました。");
        }
      });
  }, []);
  return (
    <Root>
      <h1>メールアドレスに届いたリンクをクリックしてください。</h1>
      <Button
        onClick={resendEmail}
        variant="contained"
        disabled={sent || isLoading}
      >
        {sent ? "再送しました" : "メールを再送する"}
      </Button>
      {isLoading ? "通信中" : undefined}
      {errorMessage === "" ? undefined : (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </Root>
  );
}
