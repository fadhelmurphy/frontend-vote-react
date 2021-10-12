import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { RootContext } from '../../../Context/Context';
import { Link } from 'react-router-dom';
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
    // e.preventDefault()
    const {_postRegister} = this.context
    const user = {
      nama: this.state.nama,
      email: this.state.email,
      password: this.state.password
    }
    _postRegister(user)
  }

    componentDidMount() {
      const {success} = this.context.state.auth
      success && this.props.history.push(`/voting`)
      // const { contacts, addNewContact } = this.props;
      // if(contacts.token!=null){
      //   this.props.history.push(`/voting`)
      //   console.log(contacts)
      // }
  }

  render() {
    return (
      
      <Form name="control-hooks" onFinish={this.onSubmit} 
      layout={"vertical"}
      >
              <h1 className="h3 mb-3 font-weight-normal">Register Page</h1>
              <div
            className="Features"
            dangerouslySetInnerHTML={{ __html: this.state.alert }}
          />
                <Form.Item name="nama" label="Nama" rules={[{ required: true }]}>
                <Input
                  type="name"
                  className="form-control"
                  name="nama"
                  placeholder="Masukkan Nama"
                  value={this.state.name}
                  onChange={this.onChange}
                /></Form.Item>
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
          <Button className="btn-block" type="primary" htmlType="submit" size={"large"}>Sign Up</Button>
        </Form.Item>
        <Form.Item layout={"vertical"} className="text-center">
        <Link to="/login">Back to login</Link>
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
Register.contextType = RootContext
export default Register
