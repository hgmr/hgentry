import { Button } from "@material-ui/core";
import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import useReactRouter from "use-react-router";
import { isLoginState } from "../../atoms/auth";
export function SignUp() {
  const { history } = useReactRouter();
  const isLogin = useRecoilValue(isLoginState);
  const goToSignUp = useCallback(() => {
    history.push("/signup");
  }, []);
  return (
    <>
      {" "}
      {isLogin ? undefined : (
        <Button onClick={goToSignUp} variant="contained">
          新規登録
        </Button>
      )}
    </>
  );
}
