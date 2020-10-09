import { combineReducers } from "redux";

function contacts(state = {}, action) {
  switch (action.type) {
    case "GRANTED":
      // Menambahkan kontak baru kedalam daftar
      return { ...state,nama: action.nama,
        token: action.token };
    case "REVOKE":
      // Menghapus kontak dari daftar
     return state = {}
    //   return state.filter(data => data.nama !== action.nama);
    default:
      return state;
  }
}

const Reducers = combineReducers({
  contacts
  // Reducer lain yang mungkin kamu butuhkan
});

export default Reducers;