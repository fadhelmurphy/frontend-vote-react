import React from "react";
import { isAuthenticated } from "../Helpers/Auth";

export const AuthContext = React.createContext();

export default class extends React.Component {
  constructor(props) {
    super(props);
    let state = {
      authenticated: false,
      setAuthenticated: this.setAuthenticated
    };

    if (isAuthenticated()) state = { ...state, authenticated: true };

    this.state = state;
  }

  setAuthenticated = authenticated => {
    this.setState({ authenticated });
  };

  render() {
  const {children} = this.props
    return (
      <AuthContext.Provider value={this.state}>
        <children {...this.props}/>
      </AuthContext.Provider>
    );
  }
}
