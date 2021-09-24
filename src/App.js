import React, { useEffect } from "react";
import Router from "./router";
import Context from "./Context/Context";


export default function App() {
  const initialState = {
  user: [],
};
  return (
    <>
    {/* <StoreProvider initialState={initialState} reducer={bookTableReducer}> */}
      {/* <Context> */}
        <Router />
    {/* </StoreProvider> */}
      {/* </Context> */}
    </>
  );
}
