import React, { Component } from "react";
import {
  Link
} from "react-router-dom";

class index extends Component {
  render() {
      const {lastMenu} = this.props
    return (
        <ul class="list-group">
          <li class="list-group-item active">MAIN MENU</li>
          <Link to="/voting">
          <a class="list-group-item">
            <i class="fa fa-tachometer-alt"></i> Dashboard
          </a>
          </Link>
          <Link to="/links">
          <a class="list-group-item">
            <i class="fa fa-user-circle"></i> Manage Links
          </a>
          </Link>
          <a
            href="#"
            class="list-group-item"
            onClick={() => lastMenu()}
            style={{ color: "#212529" }}
          >
            <i class="fa fa-sign-out-alt"></i> Logout
          </a>
        </ul>
    );
  }
}
export default index