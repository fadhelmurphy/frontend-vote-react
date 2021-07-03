import React, { Component } from 'react'
import { register,getUser } from '../../../Helpers/UserFunctions'
// import jwt_decode from 'jwt-decode'
// import { addContact } from '../../redux/actions'
// import { connect } from "react-redux";


class Register extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      nama:'',
      token:'',
      alert:''
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    
    // const { contacts, addNewContact } = this.props;
    e.preventDefault()

    const user = {
      nama: this.state.nama,
      email: this.state.email,
      password: this.state.password
    }

    register(user)
    .then(async(res) => {
      const {alert,reload} = res
      this.setState({
        alert
      })
      if (reload) {
        await this.setState({token:localStorage.getItem("usertoken")})
        await getUser()
        .then(res => {
          this.setState({
            name: res
          })
        })
        this.props.history.push(`/voting`)
      }
    })
  }

    componentDidMount() {
      console.log(this.props)
      const token = localStorage.getItem("usertoken")
      if(token!==null){
        this.props.history.push(`/voting`)
      }
      // const { contacts, addNewContact } = this.props;
      // if(contacts.token!=null){
      //   this.props.history.push(`/voting`)
      //   console.log(contacts)
      // }
  }

  render() {
    return (
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register Page</h1>
              <div
            className="Features"
            dangerouslySetInnerHTML={{ __html: this.state.alert }}
          />
              <div className="form-group">
                <label htmlFor="email">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama"
                  placeholder="Masukkan nama lengkap"
                  value={this.state.nama}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign up
              </button>
            </form>
    )
  }
}

// export default Login

// Mengambil state dari store dan mempassing nya
// kedalam component App sebagai props
// const mapStateToProps = ({ contacts }) => ({
//   contacts
// });

// Membuat fungsional yang membutuhkan fungsi dispatch
// const mapDispatchToProps = dispatch => ({
//   addNewContact: contact => {
//     dispatch(addContact(contact));
//   }
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Register
