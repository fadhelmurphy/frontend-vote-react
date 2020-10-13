import React, { Component } from 'react'
import { login,getUser } from '../../utils/UserFunctions'
import jwt_decode from 'jwt-decode'
// import { addContact } from '../../redux/actions'
// import { connect } from "react-redux";


class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      name:'',
      token:''
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
      email: this.state.email,
      password: this.state.password
    }

    login(user)
    .then(async(res) => {
      if (res) {
        await this.setState({token:res.token})
        const decoded = jwt_decode(this.state.token)
        await getUser(decoded.uid)
        .then(res => {
          this.setState({
            name: res.data.name
          })
        })
        // addNewContact({nama:this.state.name,token:this.state.token})
        console.log(getUser.data)
        // this.setState({token:getUser.data.name})
        this.props.history.push(`/voting`)
      }
    })
  }

    componentDidMount() {
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
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
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
export default Login
