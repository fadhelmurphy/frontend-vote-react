import React, { useEffect } from "react";
import Router from "./router";
import AuthContext from "./Context/AuthContext";
// import { GlobalProvider } from "./Context/Provider";
// import { StoreProvider } from './store/store';
// import "./App.css";
// import Aos from "aos";


export default function App() {
  const initialState = {
  user: [],
};
  useEffect(() => {
    // Aos.init({
    //   once: true,
    //   easing: "slide",
    // });
  });
  return (
    <>
    {/* <StoreProvider initialState={initialState} reducer={bookTableReducer}> */}
      <AuthContext>
        <Router />
    {/* </StoreProvider> */}
      </AuthContext>
    </>
  );
}
