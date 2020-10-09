import React, {Component} from 'react';
import jwt_decode from 'jwt-decode'
import {Redirect} from 'react-router-dom'
import store from '../redux/store';
import { connect } from "react-redux";
/**
 * Get User from Local Storage
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
 * @return {obeject} UserData
 * {
 *  username: string,
 *  role: string
 * }
 */
const GetUser = (contacts) => {
    
    if(contacts.token!=null){
        const decoded = jwt_decode(contacts.token)
        const fromStorage = 'uid' in decoded
        // const fromStorage = JSON.parse(localStorage.getItem("user"));
        return !!fromStorage ? {user:contacts.nama,isAuth:true} : {user: 'guest', isAuth: false};
        }else{
            return {user: 'guest', isAuth: false}
        }
    // const token = localStorage.getItem("usertoken")
    // if(token!==null){
    // const decoded = jwt_decode(token)
    // const fromStorage = 'uid' in decoded
    // // const fromStorage = JSON.parse(localStorage.getItem("user"));
    // return !!fromStorage ? {user:decoded.uid,isAuth:true} : {user: 'guest', isAuth: false};
    // }else{
    //     return {user: 'guest', isAuth: false}
    // }
}

/**
 * Checking role its valid
 * @param {object}
 * {
 *   role: string,
 *   allowedRoles: array,
 * }
 * @return {boolean} 
 */
const isValidRole = ({isAuth, allowedRoles}) => allowedRoles.includes(isAuth);

/**
 * Authorization (High Order Component Concept)
 * @param {array} allowedRoles
 * @param {object} WrappedComponent
 * @return {object} React.Component
 *
 * Example:
 *    # set AllowedRoles with Component
 *    const AuthComponent = Authorization(['user','admin','superman'])(MyComponent)
 *
 *    # set AllowedRoles without Component
 *    const AuthHOC = Authorization(['user','admin','superman'])
 *    const MyComponent = () => <h1> Hello </h1>
 *    const AuthComponent = AuthHOC(MyComponent);
 *
 *    ReactDOM.render( <AuthComponent/>, target);
 */
const Authorization = allowedRoles => WrappedComponent => {
    
    class withAuth extends Component {
    constructor(props){
        super(props);
        const {contacts} = props
        this.state = {
            user: GetUser(contacts), // state user assign value from GetUser function
        }
    }        
    
    render(){
        const {isAuth} = this.state.user;
        // return isValidRole({isAuth: isAuth, allowedRoles: allowedRoles}) ?
        return isAuth ?
            <WrappedComponent {...this.props}/>:
            // <><h1>STOP DULU GAN</h1></>
            <>{window.location.replace('/login')}</>
    }
}
// Mengambil state dari store dan mempassing nya
// kedalam component App sebagai props
const mapStateToProps = ({ contacts }) => ({
    contacts
  });
  
  return connect(mapStateToProps)(withAuth);
}


/**
 * define administrator role
 * use: Admin(<Component/>)
 */
export const Admin = Authorization();

/**
 * define user role
 * use: User(<Component/>)
 */
// export const User = Authorization(['admin','user']);

export default {
    Admin,
}