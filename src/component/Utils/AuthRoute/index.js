import React, { useContext, useEffect, 
  // useState 
} from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../../Helpers/Auth";
import { AuthContext } from "../../../Context";

export default ({ component: Component, ...rest }) => {

  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated({auth:true});
    } else {
      setAuthenticated({auth:false});
    }
  }, []); 
  if (authenticated.auth) {
    
    return <>
    <Route {...rest} component={Component} /></>;
  } else {
    return <Redirect to="/login" />;
  }
};
