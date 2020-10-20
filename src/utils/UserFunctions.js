import React from 'react'
import api from '../api'
import {setHeader} from '../Helpers/Auth'
// import api from 'api'
// import { URL_API } from "./api";

export const register = newUser => {
  return api
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return api
    .post('login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem('usertoken', res.data.token)
      return res.data
    })
    .catch(err => {
      console.log('Invalid username and password, ' + err)
    })
}

export const showPriv8 = code => {
  return api
    .post('show/priv8', {code},setHeader())
}

export const logout = () => {
  localStorage.removeItem('usertoken');
  window.location.replace('/login')
}

export const getUser = () => {
  return api
    .get(`getuser`,setHeader())
    .then(response => {
      return response
    })
    .catch(err => {
      return err
    })
}
