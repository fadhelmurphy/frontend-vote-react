import React, { useEffect } from "react";
import Router from "./router";
import AuthContext from "./Context/AuthContext";
import "./App.css";
// import Aos from "aos";


export default function App() {
  useEffect(() => {
    // Aos.init({
    //   once: true,
    //   easing: "slide",
    // });
  });
  return (
    <>
      <AuthContext>
        <Router />
      </AuthContext>
    </>
  );
}
