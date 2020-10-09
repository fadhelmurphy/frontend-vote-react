import React from 'react'
import axios from 'axios'
import { URL_API } from "./api";

export const register = newUser => {
  return axios
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
  return axios
    .post(URL_API+'login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      // localStorage.setItem('usertoken', res.data.token)
      return res.data
    })
    .catch(err => {
      console.log('Invalid username and password, ' + err)
    })
}

export const logout = () => {
  localStorage.removeItem('usertoken');
  window.location.replace('/login')
}

export const getUser = id => {
  return axios
    .get(URL_API+`getuser/${id}`)
    .then(response => {
      return response
    })
    .catch(err => {
      return err
    })
}
