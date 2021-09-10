import React from "react";
import api from "../api";
import { setHeader, setFileHeader } from "./Auth";
// import api from 'api'
// import { URL_API } from "./api";
import { customErr } from "./CustomError";

var hasil = "";
export const register = (newUser) => {
  return api
  .post("register", {
    name: newUser.nama,
    email: newUser.email,
    password: newUser.password,
  })
    .then((res) => {
      console.log(res);
      localStorage.setItem("usertoken", res.data.token);
      hasil = customErr(res.status, "registrasi");
      return hasil;
    })
    .catch((err) => {
      console.log(err.response)
      hasil = customErr(
        err.response.status,
        "Anda gagal registrasi dengan pesan : "+err.response.data.message
      );
      return hasil;
    });
};

export const login = (user) => {
  return api
    .post("login", {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("usertoken", res.data.token);
      hasil = customErr(res.status, "login");
      return hasil;
    })
    .catch((err) => {
      hasil = customErr(
        err.response.status,
        "Username dan Password anda salah"
      );
      return hasil;
    });
};

export const deleteVoter = (vote) => {
  return api.post("deletevoter", { 
    id_vote:vote.id_vote,
    email:vote.email
   }, setHeader())
   .then((res) => {
    window.location.replace("/voting");
   })
   .catch((err) => {
     alert('gagal delete voter',err)
   });
};

export const showPriv8 = (code) => {
  return api.post("show/priv8", { code }, setHeader());
};

export const showPub = (code) => {
  return api.post("show/priv8", { code }, setHeader());
};

export const logout = () => {
  localStorage.removeItem("usertoken");
  window.location.replace("/login");
};

export const getUser = () => {
  return api
    .get(`getuser`, setHeader())
    .then((response) => {
      return response.data.name;
    })
    .catch((err) => {
      console.log("Gagal memuat user ", err);
      return err;
    });
};

export const TambahVote = (data) => {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
    if(key!=="data"){
      formData.append(key,value)
    }else{
      value.forEach(element => {
        console.log(element)
        formData.append("kandidat[]",element.kandidat)
        // element.kandidatImage.originFileObj.name = element.kandidatImage.name+"."+getExtension[1]
        if(element.kandidatImage===""){
          formData.append("fileName[]","kosong")
        }else{
          var getExtension = element.kandidatImage.type.split('/')
          console.log(element.kandidatImage.name+"."+getExtension[1])
        formData.append("fileName[]",element.kandidatImage.name+"."+getExtension[1])
        formData.append("kandidatImage[]",element.kandidatImage.originFileObj,element.kandidatImage.name+"."+getExtension[1])
        }
      });
    }
  }
  for (let pair of formData.entries()) {
    console.log(pair[0],pair[1])
  }
  
  return api
    .post("add", formData, setFileHeader())
    // .post("add", data, setHeader())
    .then((res) => {
      console.log(res);
      const comment = "menambahkan Vote!";
      alert(comment);
      hasil = customErr(res.status, comment);
      return hasil;
    })
    .catch((err) => {
      const comment = "Anda gagal menambahkan Vote";
      alert(comment);
      hasil = customErr(err.response.status, comment);
      return hasil;
    });
};

export const bulkDelete = (data) => {
  return api
    .post("bulkdelete/", data, setHeader())
    .then((res) => {
      console.log(res);
      const comment = "delete Vote!";
      alert("Berhasil " + comment);
      hasil = customErr(res.status, comment);
      return hasil;
    })
    .catch((err) => {
      const comment = "Anda gagal delete Vote!";
      alert(comment + " Dengan error code " + err.response.status);
      hasil = customErr(err.response.status, comment);
      return hasil;
    });
};

export const bulkDeleteLinks = (data) => {
  return api
    .post("bulkdeletelinks/", data, setHeader())
    .then((res) => {
      console.log(res);
      const comment = "delete Link!";
      alert("Berhasil " + comment);
      hasil = customErr(res.status, comment);
      return hasil;
    })
    .catch((err) => {
      const comment = "Anda gagal delete Link!";
      alert(comment + " Dengan error code " + err.response.status);
      hasil = customErr(err.response.status, comment);
      return hasil;
    });
};

export const DeleteOneVote = (data) => {
  return api
    .get("delete/" + data, setHeader())
    .then((res) => {
      console.log(res);
      const comment = "delete Vote!";
      alert(comment);
      hasil = customErr(res.status, comment);
      return hasil;
    })
    .catch((err) => {
      const comment = "Anda gagal delete Vote!";
      alert(comment);
      hasil = customErr(err.response.status, comment);
      return hasil;
    });
};

export const DeleteOneLink = (data) => {
  return api
    .get("deletelink/" + data, setHeader())
    .then((res) => {
      console.log(res);
      const comment = "delete Link!";
      alert(comment);
      hasil = customErr(res.status, comment);
      return hasil;
    })
    .catch((err) => {
      console.log(err)
      const comment = "Anda gagal delete Link!";
      alert(comment);
      hasil = customErr(err.response.status, comment);
      return hasil;
    });
};

export const UpdateOneVote = (Vote) => {
  console.log(Vote)
  const formData = new FormData();
  Vote.forEach(element => {
    // console.log(element)
    formData.append("id[]",element.id)
    formData.append("id_vote[]",element.id_vote)
    formData.append("action[]",element.action)
    formData.append("kandidat[]",element.kandidat)
    formData.append("votename[]",element.votename)
    // element.kandidatImage.originFileObj.name = element.kandidatImage.name+"."+getExtension[1]
    if(element.kandidatImage===""){
      formData.append("fileName[]","kosong")
    }else if(typeof element.kandidatImage === 'object'){
      var getExtension = element.kandidatImage.type.split('/')
      console.log(element.kandidatImage.name+"."+getExtension[1])
    formData.append("fileName[]",element.kandidatImage.name+"."+getExtension[1])
    formData.append("kandidatImage[]",element.kandidatImage.originFileObj,element.kandidatImage.name+"."+getExtension[1])
    }else{
      formData.append("fileName[]",element.kandidatImage)
    }
  });

  for (let pair of formData.entries()) {
    console.log(pair[0],pair[1])
  }
  return api
    .post("update", formData, setFileHeader())
    .then((res) => {
      console.log(res);
      const comment = "mengupdate Vote!";
      alert(comment);
      hasil = customErr(res.status, comment);
      return hasil;
    })
    .catch((err) => {
      const comment = "Anda gagal update Vote!";
      alert(comment);
      hasil = customErr(err.response.status, comment);
      return hasil;
    });
};

export const UpdateOneLink = (Vote) => {
  return api
    .post("updatelink", { Vote }, setHeader())
    .then((res) => {
      console.log(res);
      const comment = "mengupdate Link!";
      alert(comment);
      hasil = customErr(res.status, comment);
      return hasil;
    })
    .catch((err) => {
      const comment = "Anda gagal update Link!";
      alert(comment);
      hasil = customErr(err.response.status, comment);
      return hasil;
    });
};
