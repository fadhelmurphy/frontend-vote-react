const intialAuth = {
    success:false,
    token:null,
    email:null
  }

export const authReducer = (state=intialAuth, action) => {
  const {type,payload} = action
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        success: payload.success,
        token: payload.token,
        email: payload.email
      };
    case "LOGOUT_SUCCESS":
      return { ...state, success: false, token: null, email:null };
    default:
      return state;
  }
};

const intialVote = {
  AllVote:[],
  DetailVote:null,
  // ResultVote:null
}

export const voteReducer = (state=intialVote, action) => {
  const {type,payload} = action
  switch (type) {
    case "GET_ALL_VOTES_SUCCESS":
      return { ...state, AllVote: payload };
    case "GET_DETAIL_VOTE_SUCCESS":
      return { ...state, DetailVote: payload };
    // case "GET_RESULT_VOTE_SUCCESS":
    //     return { ...state, ResultVote: action.payload };
    default:
      return state;
  }
};

const intialLink = {
  AllLinks:[],
  DetailLink:null,
  UrlLink:null
}

export const linkReducer = (state=intialLink, action) => {
  const {type,payload} = action
  switch (type) {
    case "GET_ALL_LINKS_SUCCESS":
      return { ...state, AllLinks: payload };
    case "GET_DETAIL_LINK_SUCCESS":
      return { ...state, DetailLink: payload };
    case "GET_URL_LINK_SUCCESS":
        return { ...state, UrlLink: payload };
    default:
      return state;
  }
}