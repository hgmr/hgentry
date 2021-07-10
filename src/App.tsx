import React from 'react';
import './App.css';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAR1HXvyEqt_wv4uy9eEdMCJ35OD0Kah50",
  authDomain: "hgentry.firebaseapp.com",
  projectId: "hgentry",
  storageBucket: "hgentry.appspot.com",
  messagingSenderId: "962579619586",
  appId: "1:962579619586:web:b22e12113fd75c442cac1b",
  measurementId: "G-5T3M4J5EX8"
};
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      aaa
    </div>
  );
}

export default App;
