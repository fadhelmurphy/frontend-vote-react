import React, { Component } from "react";

import { ListLink } from "../component/Contents/LinkManager";
import { Sidebar, Header } from "../component/Shared";

import { Layout } from "antd";
import { AuthNav } from "../component/Shared/Nav";
class LinkManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false
    };
  }
  render() {
    const { Content, Footer } = Layout;
    return (
      <>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Header customKata="Selamat datang di aplikasi evoting" />
            <AuthNav {...this.state}
              setState={(val)=>this.setState(val)}/>
          </Content>
          <Content className={"container"}>
            <Layout
              className="site-layout-background row rounded"
              style={{ padding: "24px 0", background: "white" }}
            >
              <Sidebar />
              <ListLink  {...this.state}
              setState={(val)=>this.setState(val)}/>
            </Layout>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </>
    );
  }
}
export default LinkManager;
