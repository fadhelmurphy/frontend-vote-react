const intialAuth = {
    success:false,
    token:null
  }

export const authReducer = (state=intialAuth, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log(action.payload.token)
      return {
        ...state,
        success: action.payload.success,
        token: action.payload.token
      };
    case "LOGOUT_SUCCESS":
      return { ...state, success: false, token: null };
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
  switch (action.type) {
    case "GET_ALL_VOTES_SUCCESS":
      return { ...state, AllVote: action.payload };
    case "GET_DETAIL_VOTE_SUCCESS":
      return { ...state, DetailVote: action.payload };
    // case "GET_RESULT_VOTE_SUCCESS":
    //     return { ...state, ResultVote: action.payload };
    default:
      return state;
  }
};

const intialLink = {
  AllLink:[],
  DetailLink:null,
  // ResultVote:null
}

export const linkReducer = (state=intialLink, action) => {
  switch (action.type) {
    case "GET_ALL_LINKS_SUCCESS":
      return { ...state, AllLinks: action.payload };
    case "GET_DETAIL_LINKS_SUCCESS":
      return { ...state, DetailLinks: action.payload };
    default:
      return state;
  }
}