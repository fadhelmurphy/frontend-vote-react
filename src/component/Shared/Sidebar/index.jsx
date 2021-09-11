import React, { Component, useState } from "react";
import { Link,useHistory, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

class index extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;
    const { lastMenu } = this.props;  
    const currentUrl = window.location.pathname
    return (
      <Sider
      // breakpoint="lg"
      // collapsedWidth="90%"
      className="col-12 col-md-6 mb-3" style={{background:'transparent'}} width="340">
        <Menu
          mode="inline"
          // defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
    selectedKeys={currentUrl}
          style={{ height: "100%" }}
        >
          <Menu.Item key={"/voting"}>
            <Link to="/voting">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key={"/links"}>
            <Link to="/links">Manage Links</Link>
          </Menu.Item>
          <Menu.Item onClick={() => lastMenu()}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
export default index;
