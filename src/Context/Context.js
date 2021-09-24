import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback
} from "react";
import api from "../api";
import { customErr } from "../Helpers/CustomError";
import { setFileHeader, setHeader } from "../Helpers/UserFunctions";
import { combineReducer } from "./CombinedReducers";
import { authReducer, linkReducer, voteReducer } from "./Reducers";

export const RootContext = createContext({});

export const STORAGE_KEY = "rootState";

const Context = ({ children }) => {
  //#COMBINE STATE
  const rootReducer = { auth: authReducer, vote: voteReducer, link: linkReducer };

  const reducers = useCallback(() => {
    return combineReducer(rootReducer);
  }, []);

  // call the function to get initial state and global reducer
  const [initialState, mainReducer] = reducers();

  // setup useReducer with the returned value of the reducers function
  const [state, dispatch] = useReducer(mainReducer, initialState, () => {
    const Local = localStorage.getItem(STORAGE_KEY);
    const ParseLocal = JSON.parse(Local);
    return Local ? ParseLocal : initialState;
  });

  //#ACTION
  ///CRUD VOTING

  var hasil = "";

  const _getList = async () => {
    const response = await api.get("votes", setHeader());
    var result = response.data.data.map(function (el) {
      var o = Object.assign({}, el);
      o.isChecked = false;
      return o;
    });
    dispatch({
      type: "GET_ALL_VOTES_SUCCESS",
      payload: result
    });
  };

  const _postUpdateOneVote = (Vote) => {
    const formData = new FormData();
    formData.append("title", Vote.title);
    Vote.candidates.forEach((element) => {
      console.log(element);
      element.id && formData.append("id[]", element.id);
      formData.append("is_delete[]", element.is_delete);
      formData.append("name[]", element.name);
      // element.kandidatImage.originFileObj.name = element.kandidatImage.name+"."+getExtension[1]
      element.image &&
        element.image.originFileObj &&
        formData.append(
          "image[]",
          element.image.originFileObj,
          element.image.name
        );
    });

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    return api
      .post("votes/" + Vote.id + "/update", formData, setFileHeader())
      .then((res) => {
        console.log(res);
        const comment = "Berhasil mengupdate Vote!";
        hasil = customErr(res.status, comment);
        _getList();
        dispatch({
          type: "EDIT_MODAL"
        });
        return hasil;
      })
      .catch((err) => {
        const comment = "Anda gagal update Vote!";
        hasil = customErr(err.response.status, comment);
        return hasil;
      });
  };

  const _getVote = async (id) => {
    dispatch({
      type: "GET_DETAIL_VOTE_SUCCESS",
      payload: null
    });
    const response = await api.get("votes/" + id, setHeader());
    response.data.data.candidates.map((el) => {
      el["is_delete"] = 0;
    });

    dispatch({
      type: "GET_DETAIL_VOTE_SUCCESS",
      payload: response.data.data
    });
  };

  const _postDeleteOneVote = (id) => {
    return api
      .post("votes/" + id + "/delete", null, setHeader())
      .then((res) => {
        console.log(res);
        const comment = "delete Vote!";
        hasil = customErr(res.status, comment);

        dispatch({
          type: "EDIT_MODAL"
        });
        return hasil;
      })
      .catch((err) => {
        const comment = "Anda gagal delete Vote!";
        hasil = customErr(err.response.status, comment);
        return hasil;
      });
  };

  const _getBulkDelete = (data) => {
    return api
      .get("bulkdelete/", data, setHeader())
      .then((res) => {
        console.log(res);
        const comment = "Berhasil delete Vote!";
        hasil = customErr(res.status, comment);

        const { reload } = hasil;
        if (reload) {
          dispatch({
            type: "IS_SELECTED"
          });
        }
        return hasil;
      })
      .catch((err) => {
        const comment = "Anda gagal delete Vote! Dengan error code " + err.response.status;
        hasil = customErr(err.response.status, comment);
        return hasil;
      });
  };

  const _postTambahVote = (data) => {
    const formData = new FormData();
    formData.append("title",data.title)
    data.data.forEach(({name,image})=>{
  
      formData.append("name[]",name)
      if(image!==""){
        formData.append("image[]",image.originFileObj,image.name)
      }
    })
    for (let pair of formData.entries()) {
      console.log(pair[0],pair[1])
    }
    
    return api
      .post("votes", formData, setFileHeader())
      // .post("add", data, setHeader())
      .then((res) => {
        console.log(res);
        const comment = "Anda berhasil menambahkan Vote!";
        hasil = customErr(res.status, comment);
        
        const { reload } = hasil;
        if(reload){
          _getList()
          dispatch({
          type:"ADD_MODAL"
        })
        return hasil
      }
      })
      .catch((err) => {
        const comment = "Anda gagal menambahkan Vote";
        hasil = customErr(err.response.status, comment);
        return hasil;
      });
  };

  // LOGIN
  const _postLoginCheck = (user) =>{
    return api
      .post("login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data
          })
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

  // LOGOUT

  const _postLogout = async () => {
    // await api.post("logout", setHeader());
    localStorage.clear();
    dispatch({
      type: "LOGOUT_SUCCESS"
    })
  }
  
  //CRUD LINK

  const _getListLink = async () => {
    const response = await api.get("links", setHeader());
    dispatch({
      type: "GET_ALL_LINKS_SUCCESS",
      payload: response
    });
  };

  // pass in the returned value of useReducer
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      //action voting
      _getList,
      _postUpdateOneVote,
      _getVote,
      _postDeleteOneVote,
      _getBulkDelete,
      _postTambahVote,
      //action login
      _postLoginCheck,
      //action logout
      _postLogout,
      //action link
      _getListLink
    }),
    [state, dispatch]
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <RootContext.Provider value={contextValue}>{children}</RootContext.Provider>
  );
};

export const GetRootContext = () => useContext(RootContext);

export const withContext = (Component) => {
  return (props) => {
    return (
      <RootContext.Consumer>
        {(value) => {
          return <Component {...props} {...value} />;
        }}
      </RootContext.Consumer>
    );
  };
};

export default Context;
