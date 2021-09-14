import React, { Component } from "react";
import Aos from "aos";
import { imgVote } from "../../../asset";
class index extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Aos.init({
      once: true,
      easing: "slide",
    });
  }

  render() {
    var { customKata } = this.props;
    return (
      <>
        <div className="container">
          <div
            className="row"
            data-aos="zoom-in"
            data-aos-duration="700"
            data-aos-delay="50"
          >
            <div className="col-md-6 py-5 text-center align-self-center">
              <span className="display-4">E-Voting App</span>
              <br />
              <span className="lead mt-1 mb-2">
                {customKata
                  ? customKata
                  : "Selamat datang di aplikasi evoting silahkan login untuk memilih"}
              </span>
            </div>
            <div className="col-md-6 pt-5 text-center">
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
      </>
    );
  }
}

export default index;
