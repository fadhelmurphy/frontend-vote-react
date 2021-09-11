import React, { Component } from 'react'
import { login,getUser } from '../../../Helpers/UserFunctions'
import { Form, Input, Button, Select } from 'antd';
// import jwt_decode from 'jwt-decode'
// import { addContact } from '../../redux/actions'
// import { connect } from "react-redux";


class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      name:'',
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
    // e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user)
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
        // this.props.history.push(`/voting`)
      }
    })
  }

    componentDidUpdate() {
      // console.log(this.props)
      // const token = localStorage.getItem("usertoken")
      // const { contacts, addNewContact } = this.props;
      // if(contacts.token!=null){
      //   this.props.history.push(`/voting`)
      //   console.log(contacts)
      // }
  }

  render() {
    const token = localStorage.getItem("usertoken")
    if(token!==null || this.state.token!==''){
      this.props.history.push(`/voting`)
    }
    return (
      <Form name="control-hooks" onFinish={this.onSubmit} 
      layout={"vertical"}
      >
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div
            className="Features"
            dangerouslySetInnerHTML={{ __html: this.state.alert }}
          />
                <Form.Item name="Email" label="Email address" rules={[{ required: true }]}>
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                /></Form.Item>
                
                <Form.Item name="Password" label="Password" rules={[{ required: true }]}>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                /></Form.Item>
                
        <Form.Item layout={"vertical"}>
          <Button className="btn-block" type="primary" htmlType="submit" size={"large"}>Sign In</Button>
        </Form.Item>
            </Form>
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
