import React, { Component } from 'react'
import { imgVote } from '../../asset';
import Aos from 'aos';
import './index.css';
import {showPriv8} from '../../utils/UserFunctions'

class HeaderComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                token: ''
            },
            messageErr: '',
            data:[]
        }
    }

    _handleFormChange = (event) => {
        let formData = { ...this.state.form }
        formData[event.target.name] = event.target.value;
        this.setState({
            form: formData
        })
    }

    _handleFormSubmit = async() => {
        const token = this.state.form.token;
        if (token === '') {
            this.setState({
                messageErr: 'Harap masukan token'
            })
        }else{
            await showPriv8(token).then(
                res=>this.setState({data:res.data}) 
            )
        }
        // this.setState({data:urlFetch.data}) 
    }


    componentDidMount() {
        console.log(this.props);
        Aos.init({
            once: true,
            easing: 'slide',
        });
    }

    setStateAsync(state){
        return new Promise( resolve => {
            this.setState(state, resolve) 
        }) 
        }

    render() {
        const data= this.state.data
        console.log(data)
        return (
            <>
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
                        <div className="row mt-3">
                            <div className="col">
                                <input type="text" name="token" onChange={this._handleFormChange} id="" className="form-control" placeholder="Masukan token disini" value={this.state.form.token} />
                                <small className="text-danger">{this.state.messageErr}</small>
                            </div>
                            <div>
                                <button className="btn btn-primary mr-2" onClick={this._handleFormSubmit}>Enter</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pt-5 text-center">
                        <img src={imgVote} alt="" className="img-fluid" data-aos="zoom-in" data-aos-duration="700" data-aos-delay="50" />
                    </div>
                </div>
                {data&&
                data.map((el,i) => {
                  return (
                    <>
                      <div className="row mb-3">
                        <div className="col">
                          <div class="list-group">
                            <a
                              href="#"
                              class="list-group-item justify-content-between"
                              data-id={el.id_vote}
                              data-name={el.votename}
                            //   data-toggle={!isSelected && "modal"}
                            //   data-target={!isSelected && "#my-modal"}
                            >
                              {el.votename}
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
                }
            </div>
        
            </>
        )
    }
}

export default HeaderComp