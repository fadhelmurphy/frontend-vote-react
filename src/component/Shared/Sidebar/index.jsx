import React, { Component } from "react";

class index extends Component {
  render() {
      const {lastMenu} = this.props
    return (
        <ul class="list-group">
          <li class="list-group-item active">MAIN MENU</li>
          <a class="list-group-item" style={{ color: "#212529" }}>
            <i class="fa fa-tachometer-alt"></i> Dashboard
          </a>
          <a class="list-group-item">
            <i class="fa fa-user-circle"></i> My Profile
          </a>
          <a class="list-group-item">
            <i class="fa fa-user-circle"></i> Manage Links
          </a>
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