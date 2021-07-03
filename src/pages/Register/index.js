import { Register } from "../../component/Contents/Register";
import React, { Component } from "react";
export default class index extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <Register {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
