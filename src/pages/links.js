

import React, { Component } from 'react'

import { ListLink } from '../component/Contents/LinkManager';
import { Sidebar,Header } from '../component/Shared';
import { logout } from '../Helpers/UserFunctions';

import { Layout, Menu } from "antd";
import { AuthNav } from '../component/Shared/Nav';
import { RootContext } from '../Context/Context';
class LinkManager extends Component{
    constructor(props){
        super(props)
    }
    render(){
      const { Content, Footer } = Layout;
      return (
        <>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Header customKata="Selamat datang di aplikasi evoting" />
            <AuthNav/>
          </Content>
          <Content className={"container"}>
            <Layout
              className="site-layout-background row rounded"
              style={{ padding: "24px 0", background:'white'}}
            >
              <Sidebar />
                <ListLink />
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
export default LinkManager
