import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import React, { useCallback, useEffect } from "react";
import useReactRouter from "use-react-router";
import { Root } from "./styled/Root";
export function Home() {
  return (
    <Root>
      <h1>演奏会プログラム作成ツール</h1>
    </Root>
  );
}
