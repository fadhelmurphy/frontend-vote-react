import React, { useEffect } from "react";
import Router from "./router";
import AuthContext from "./Context/AuthContext";
import "./App.css";
import Aos from "aos";
import { Cube } from "react-preloaders";

export default function App() {
  useEffect(() => {
    Aos.init({
      once: true,
      easing: "slide",
    });
  });
  return (
    <>
      <Cube background="#fff" animation="slide" color="#007bff" time={1000} />
      <AuthContext>
        <Router />
      </AuthContext>
    </>
  );
}
