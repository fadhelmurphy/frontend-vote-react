import React, { Component } from "react";

import { ListAll } from "../../component/Contents/Voting";
import { Sidebar, Header } from "../../component/Shared";
import { logout } from "../../Helpers/UserFunctions";

import { Layout, Menu } from "antd";

class Voting extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { SubMenu } = Menu;
    const { Content, Footer, Sider } = Layout;
    return (
      <>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Header customKata="Selamat datang di aplikasi evoting" />
          </Content>
          <Content className={"container"}>
            <Layout
              className="row"
              style={{ padding: "24px 0", background:'white'}}
            >
              <Sidebar lastMenu={logout} />
                <ListAll {...this.props} />
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
export default Voting;
