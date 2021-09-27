import React, { Component } from "react";

import { VoteId } from "../../component/Contents/Voting";
import { Sidebar, Header } from "../../component/Shared";

import { Layout, Menu } from "antd";
import { AuthNav } from "../../component/Shared/Nav";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowAddModal:false
    }
  }
  render() {
    const { SubMenu } = Menu;
    const { Content, Footer, Sider } = Layout;
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
              className="row"
              style={{ padding: "24px 0", background:'white'}}
            >
              <Sidebar/>
            <div class="col">
              <VoteId {...this.props}  {...this.state}
              setState={(val)=>this.setState(val)}/>
            </div>
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
export default Index;
