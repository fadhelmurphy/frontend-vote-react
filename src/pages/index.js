import React, { Component } from 'react'
import { Header } from '../component/Shared';
import { HomeNav } from '../component/Shared/Nav';
import Aos from "aos";
import { imgVote } from "../asset";
import { Button } from 'antd';
import { Link } from "react-router-dom";
export default class index extends Component {
  componentDidMount() {
    Aos.init();
  }

    render() {
        return (
            <>
        <div className="container" style={{minHeight:'600px'}}>
          <div
            className="row"
          >
            <div className="col-12 py-5 text-center align-self-center">
              <span className="display-4 font-weight-bold"
              
            data-aos="zoom-in"
            data-aos-duration="700"
              >E-Voting App</span>
              <br />
              <h6 className="my-3 text-muted">
                Selamat datang di aplikasi evoting silahkan login untuk memilih.
              <br />
                Jika anda belum memiliki akun silahkan register
              </h6>
              <br /> 
              <Link to="/login">
          <Button type="primary" size={"large"} shape="round">Login</Button>
          </Link>
              <Link to="/register">
          <Button type="link" size={"large"} shape="round">Register</Button>
          </Link>
            </div>
            <div className="col-12 pt-5 text-center">
              <img
                src={imgVote}
                alt=""
                width="400"
                className="img-fluid"
                data-aos="zoom-in"
                data-aos-duration="700"
                data-aos-delay="50"
              />
            </div>
          </div>
        </div>
                {/* <Header /> */}
                <HomeNav/>
            </>
        )
    }
}
