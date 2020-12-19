import { Login } from "../../component/Contents/Login";
import React, { Component } from "react";
export default class index extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <Login />
          </div>
        </div>
      </div>
    );
  }
}
