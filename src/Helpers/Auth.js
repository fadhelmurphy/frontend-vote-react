import api from "../api";

export const isAuthenticated = () => {
  const token = localStorage.getItem("usertoken");

  return token != null ? token : false;
};


export const setHeader = () => {
  const token = isAuthenticated();
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + token
    },
  };
}

export const setFileHeader = () => {
  const token = isAuthenticated();
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: 'Bearer ' + token
    },
  };
}


// export { isAuthenticated, getToken, login, logout, register, setHeader,setFileHeader };
