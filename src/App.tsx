import React, { useEffect } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { ConcertList } from "./components/ConcertList";
import { Concert } from "./components/Concert";
import { Entry } from "./components/Entry";
import { MailVerify } from "./components/MailVerify";
import useReactRouter from "use-react-router";
import { isLoginState } from "./atoms/auth";
import { useSetRecoilState } from "recoil";
import Header from "./components/header/Header";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STRAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

function App() {
  const { history, location } = useReactRouter();
  const setIsLogin = useSetRecoilState(isLoginState);
  useEffect(() => {
    const path = location.pathname;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        if (user.emailVerified) {
          if (
            path === "/" ||
            path === "/login" ||
            path === "/signup" ||
            path === "/mail-verify"
          ) {
            history.push("/concert-list");
          }
        } else {
          if (path !== "/mail-verify") {
            history.push("/mail-verify");
          }
        }
      } else {
        setIsLogin(false);
        if (path !== "/login" && path !== "/signup" && path !== "/") {
          history.push("/");
        }
      }
    });
  }, [location]);
  return (
    <>
      <Header />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/concert-list" component={ConcertList} />
        <Route path="/concert/:id" component={Concert} />
        <Route path="/entry" component={Entry} />
        <Route path="/mail-verify" component={MailVerify} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
