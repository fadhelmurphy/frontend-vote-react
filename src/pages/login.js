import { Login } from "../component/Contents/Login";
import React, { Component } from "react";
import { HomeNav } from "../component/Shared/Nav";
export default class index extends Component {
    
  render() {
    return (<>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <Login {...this.props} />
          </div>
        </div>
      </div>
                <HomeNav/>
                </>
    );
  }
}
