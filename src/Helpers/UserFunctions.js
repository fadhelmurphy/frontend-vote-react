import React,{useContext} from "react";
import api from "../api";
import { GetRootContext, STORAGE_KEY } from "../Context/Context";
// import { setHeader, setFileHeader } from "./Auth";
import { customErr } from "./CustomError";

var hasil = "";

export const isAuthenticated = () => {
  const Local = localStorage.getItem(STORAGE_KEY);
  const ParseLocal = JSON.parse(Local)
  const token = Local && ParseLocal['auth'] ? ParseLocal['auth']['token']:null
  return token
};

export const setHeader = () => {
  const token = isAuthenticated();
  return {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + token,
      'X-Requested-With': 'XMLHttpRequest'
    },
  };
}

export const setFileHeader = () => {
  const token = isAuthenticated();
  return {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: 'Bearer ' + token,
      'X-Requested-With': 'XMLHttpRequest'
    },
  };
}

export const register = (newUser) => {
  return api
  .post("register", {
    name: newUser.nama,
    email: newUser.email,
    password: newUser.password,
  })
    .then((res) => {
      console.log(res);
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

// export const _getList = async({dispatch}) => {
//   const response = await api.get("votes", setHeader());
//   var result = response.data.data.map(function (el) {
//     var o = Object.assign({}, el);
//     o.isChecked = false;
//     return o;
//   });
//   dispatch({
//     type:'GET_ALL_VOTES_SUCCESS',
//     payload:result
//   })
// };

// export const _getVote = ({dispatch}) => async (id) => {
//   dispatch({
//     type:'GET_DETAIL_VOTE_SUCCESS',
//     payload:null
//   })
//   const response = await api.get("votes/" + id, setHeader());
//   response.data.data.candidates.map((el) => {
//     // el["id_vote"] = id;
//     el["is_delete"] = 0;
//   });
  
//   dispatch({
//     type:'GET_DETAIL_VOTE_SUCCESS',
//     payload:response.data.data
//   })
//   // voteDispatch({
//   //   type:'GET_RESULT_VOTE_SUCCESS',
//   //   payload:response.data.result
//   // })
// };

// export const LoginCheck = ({dispatch}) => (user) =>{
//   return api
//     .post("login", {
//       email: user.email,
//       password: user.password,
//     })
//     .then((res) => {
//       dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: res.data
//         })
//       hasil = customErr(res.status, "login");
//       return hasil;
//     })
//     .catch((err) => {
//       hasil = customErr(
//         err.response.status,
//         "Username dan Password anda salah"
//       );
//       return hasil;
//     });
// };

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

// export const logout = () => {
//   localStorage.removeItem("usertoken");
//   window.location.replace("/login");
// };

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

// export const TambahVote = (context) => (data) => {
//   const {dispatch} = context
//   const formData = new FormData();
//   formData.append("title",data.title)
//   data.data.forEach(({name,image})=>{

//     formData.append("name[]",name)
//     if(image!==""){
//       formData.append("image[]",image.originFileObj,image.name)
//     }
//   })
//   for (let pair of formData.entries()) {
//     console.log(pair[0],pair[1])
//   }
  
//   return api
//     .post("votes", formData, setFileHeader())
//     // .post("add", data, setHeader())
//     .then((res) => {
//       console.log(res);
//       const comment = "Anda berhasil menambahkan Vote!";
//       hasil = customErr(res.status, comment);
      
//       const { reload } = hasil;
//       if(reload){
//         // _getList(context)
//         dispatch({
//         type:"ADD_MODAL"
//       })
//       return hasil
//     }
//     })
//     .catch((err) => {
//       const comment = "Anda gagal menambahkan Vote";
//       hasil = customErr(err.response.status, comment);
//       return hasil;
//     });
// };

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

// export const bulkDeleteLinks = (data) => {
//   return api
//     .post("bulkdeletelinks/", data, setHeader())
//     .then((res) => {
//       console.log(res);
//       const comment = "delete Link!";
//       alert("Berhasil " + comment);
//       hasil = customErr(res.status, comment);
//       return hasil;
//     })
//     .catch((err) => {
//       const comment = "Anda gagal delete Link!";
//       alert(comment + " Dengan error code " + err.response.status);
//       hasil = customErr(err.response.status, comment);
//       return hasil;
//     });
// };

// export const DeleteOneVote = ({dispatch})=>(id) => {
//   return api
//     .post("votes/"+id+"/delete",null ,setHeader())
//     .then((res) => {
//       console.log(res);
//       const comment = "delete Vote!";
//       alert(comment);
//       hasil = customErr(res.status, comment);
      
//       dispatch({
//         type:"EDIT_MODAL"
//       })
//       return hasil;
//     })
//     .catch((err) => {
//       const comment = "Anda gagal delete Vote!";
//       alert(comment);
//       hasil = customErr(err.response.status, comment);
//       return hasil;
//     });
// };

// export const DeleteOneLink = (data) => {
//   return api
//     .get("deletelink/" + data, setHeader())
//     .then((res) => {
//       console.log(res);
//       const comment = "delete Link!";
//       alert(comment);
//       hasil = customErr(res.status, comment);
//       return hasil;
//     })
//     .catch((err) => {
//       console.log(err)
//       const comment = "Anda gagal delete Link!";
//       alert(comment);
//       hasil = customErr(err.response.status, comment);
//       return hasil;
//     });
// };

// export const UpdateOneVote = ({dispatch}) =>  (Vote) => {
//   const formData = new FormData();
//   formData.append("title",Vote.title)
//   Vote.candidates.forEach(element => {
//     console.log(element)
//     element.id && formData.append("id[]",element.id)
//     formData.append("is_delete[]",element.is_delete)
//     formData.append("name[]",element.name)
//     // element.kandidatImage.originFileObj.name = element.kandidatImage.name+"."+getExtension[1]
//     element.image && element.image.originFileObj &&
//     formData.append("image[]",element.image.originFileObj,element.image.name)
//   });

//   for (let pair of formData.entries()) {
//     console.log(pair[0],pair[1])
//   }
//   return api
//     .post("votes/"+Vote.id+"/update", formData, setFileHeader())
//     .then((res) => {
//       console.log(res);
//       const comment = "mengupdate Vote!";
//       alert(comment);
//       hasil = customErr(res.status, comment);
//       // _getList({dispatch})
//       dispatch({
//         type:"EDIT_MODAL"
//       })
//       return hasil;
//     })
//     .catch((err) => {
//       const comment = "Anda gagal update Vote!";
//       alert(comment);
//       hasil = customErr(err.response.status, comment);
//       return hasil;
//     });
// };

// export const UpdateOneLink = (Vote) => {
//   return api
//     .post("updatelink", { Vote }, setHeader())
//     .then((res) => {
//       console.log(res);
//       const comment = "mengupdate Link!";
//       alert(comment);
//       hasil = customErr(res.status, comment);
//       return hasil;
//     })
//     .catch((err) => {
//       const comment = "Anda gagal update Link!";
//       alert(comment);
//       hasil = customErr(err.response.status, comment);
//       return hasil;
//     });
// };

