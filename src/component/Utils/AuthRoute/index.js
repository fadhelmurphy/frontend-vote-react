import React, { useContext, 
  // useState 
} from "react";
import { Redirect, Route } from "react-router-dom";
import { GetRootContext } from "../../../Context/Context";

export default ({ component: Component, ...rest }) => {
  const RootContext = GetRootContext()
  const { success} = RootContext.state.auth;
  if (success) {
    return <>
    <Route {...rest} component={Component} /></>;
  } else {
    return <Redirect to="/login" />;
  }
};
