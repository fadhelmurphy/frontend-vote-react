import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import Context from "./Context/Context";
// import { Cube } from "react-preloaders";
// import { Provider } from "react-redux";
// import persistStore from './redux/store'
// import { PersistGate } from "redux-persist/integration/react";
ReactDOM.render(
  <React.StrictMode>
  {/* <Provider store={persistStore().store}>
    <PersistGate loading={null} persistor={persistStore().persistor}> */}
    {/* <Cube background="#fff" animation="slide" color="#007bff"/> */}
    <Context>
      <App />
    </Context>
    {/* </PersistGate>
  </Provider>, */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
