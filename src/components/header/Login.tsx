import { Button } from "@material-ui/core";
import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import useReactRouter from "use-react-router";
import { isLoginState } from "../../atoms/auth";
export function Login() {
  const { history } = useReactRouter();
  const isLogin = useRecoilValue(isLoginState);
  const goToLogin = useCallback(() => {
    history.push("/login");
  }, []);
  return (
    <> {isLogin ? undefined : <Button onClick={goToLogin}>ログイン</Button>}</>
  );
}
