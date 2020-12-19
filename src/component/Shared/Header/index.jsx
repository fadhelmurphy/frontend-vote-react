import React, { Component } from 'react'
import Aos from 'aos';
import { imgVote } from '../../../asset';

class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageErr: '',
            redirect: '/voting'
        }
    }

    componentDidMount() {
        Aos.init({
            once: true,
            easing: 'slide',
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row" data-aos="zoom-in" data-aos-duration="700" data-aos-delay="50">
                    <div className="col-md-6 pt-5 mt-2" >
                        <span className="title" >
                            evoting app
                        </span>
                        <br />
                        <span className="subtitle mt-1 mb-2">
                            Selamat datang di aplikasi evoting silahkan login untuk memilih
                        </span>
                    </div>
                    <div className="col-md-6 pt-5 text-center">
                        <img src={imgVote}
                        alt=""
                        width="400"
                        className="img-fluid"
                        data-aos="zoom-in"
                        data-aos-duration="700"
                        data-aos-delay="50" />
                    </div>
                </div>
            </div>
        )
    }
}

export default index