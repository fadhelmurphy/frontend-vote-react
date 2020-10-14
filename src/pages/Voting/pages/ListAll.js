import React, { Component } from "react";
import Add from "../../../component/Add";
import { logout,getUser } from "../../../utils/UserFunctions";
import api from '../../../api'
// import { connect } from "react-redux";
// import { removeContact } from "../../../redux/actions";
// import { Sugar } from 'react-preloaders';
import {setHeader} from '../../../Helpers/Auth'

class ListAll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AllData: [],
      Vote: null,
      isLoading: true,
      name:null
    };
  }

  handleUpdate = (event) => {
    event.preventDefault();

    var { Vote } = this.state;
    console.log(Vote);
    api.post( "update", { Vote },setHeader()).then((res) => {
      window.location.reload(false);
    });
  };

  handleDelete = () => {
    var { Vote } = this.state;
    api.get( "delete/" + Vote[0].id_vote,setHeader()).then((res) => {
      window.location.reload(false);
    });
  };

  // handle input change
  handleTitleChange = (e, index) => {
    const { name, value } = e.target;
    const list = this.state.Vote;
    list.map((el, i) => {
      this.state.Vote[i][name] = value;
    });
    this.setState({ Vote: list });
  };

  // handle input change
  handleCandidateChange = (e, index) => {
    const { name, value } = e.target;
    const list = this.state.Vote;
    this.state.Vote[index][name] = value;
    this.setState({ Vote: list });
  };
  // handle click event of the Add button
  handleAddClick = () => {
    const list = this.state.Vote;
    list.push({
      action: "tambah",
      id: null,
      votename: list[0].votename,
      kandidat: "",
      id_vote: list[0].id_vote,
    });
    this.setState({ Vote: list });
  };
  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    const list = this.state.Vote;
    list[index]["action"] = "hapus";
    this.setState({ Vote: list });
  };
  _getVote = async (e) => {
    var id = e.target.attributes.getNamedItem("data-id").value;
    const response = await api.get( "get/" + id, setHeader());
    const list = response.data.vote.map((el) => {
      el["id_vote"] = id;
      el["action"] = "ubah";
    });
    this.setState({
      Vote: response.data.vote,
    });
  };

  _getList = async () => {
    console.log(setHeader())
    const response = await api.get('', setHeader());
    this.setState({
      AllData: response.data.votes,
      isLoading: false,
    });
  };
  _getUser = async () => {
    await getUser()
    .then(res => {
      this.setState({
        name: res.data.name
      })
    })
  }
  componentDidMount() {
    this._getList();
    this._getUser()
  }
  render() {
    const { AllData, Vote,name } = this.state;
    console.log(name)
    // const {contacts,removeExistingContact} = this.props
    return (
      <>
      {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}
        <div className="container-fluid my-5">
          <div class="row">
            <div class="col-md-3">
              <ul class="list-group">
                <li class="list-group-item active">MAIN MENU</li>
                <a class="list-group-item" style={{ color: "#212529" }}>
                  <i class="fa fa-tachometer-alt"></i> Dashboard
                </a>
                <li class="list-group-item">
                  <i class="fa fa-user-circle"></i> My Profile
                </li>
                <a href="#" class="list-group-item" onClick={()=>logout()} style={{ color: "#212529" }}>
                  <i class="fa fa-sign-out-alt"></i> Logout
                </a>
              </ul>
            </div>
            <div class="col-md-9">
              <div class="card mb-5">
                <div class="card-body">
                  <label>DASBOARD</label>
                  <hr />
                  Selamat Datang {name}
                </div>
              </div>
              <div class="card-body px-0">
                <a
                  href="#"
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#addModal"
                >
                  Add
                </a>
                <Add />
              </div>
              {AllData && AllData.map((el) => {
                return (
                  <>
                    <div
                      href="#"
                      class="list-group list-group-horizontal list-group-item-action mb-3"
                    >
                      <a
                        href="#"
                        onClick={(e) => this._getVote(e)}
                        class="list-group-item list-group-item-action"
                        data-id={el.id_vote}
                        data-name={el.name}
                        data-toggle="modal"
                        data-target="#my-modal"
                      >
                        {el.name}
                      </a>
                    </div>
                  </>
                );
              })}
              <div
                class="modal fade"
                id="my-modal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="my-modal"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        {Vote !== null ? Vote[0].votename : "kosong"}
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form method="POST">
                      <div class="modal-body">
                        <div class="form-group">
                          <label for="recipient-name" class="col-form-label">
                            Nama Vote:
                          </label>
                          <input
                            type="text"
                            name="votename"
                            class="form-control"
                            onChange={(e) => this.handleTitleChange(e)}
                            value={Vote !== null ? Vote[0].votename : "kosong"}
                            id="recipient-title"
                          />
                        </div>
                        {Vote !== null
                          ? Vote.map((element, i) => {
                              return (
                                <>
                                  {element.action !== "hapus" ? (
                                    <>
                                      <div class="form-group">
                                        <label
                                          for="recipient-name"
                                          class="col-form-label"
                                        >
                                          Opsi:
                                        </label>
                                        <input
                                          type="text"
                                          name="kandidat"
                                          class="form-control"
                                          onChange={(e) =>
                                            this.handleCandidateChange(e, i)
                                          }
                                          value={element.kandidat}
                                          id="recipient-title"
                                        />
                                      </div>
                                      <div className="form-group">
                                        {Vote.length - 1 === i && (
                                          <button
                                            type="button"
                                            class="btn btn-primary mr-3"
                                            onClick={() =>
                                              this.handleAddClick(i)
                                            }
                                          >
                                            Add
                                          </button>
                                        )}
                                        {Vote.length !== 1 && (
                                          <button
                                            type="button"
                                            class="btn btn-danger mr-3"
                                            onClick={() =>
                                              this.handleRemoveClick(i)
                                            }
                                          >
                                            Remove
                                          </button>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            })
                          : ""}
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          onClick={(e) => this.handleUpdate(e)}
                          class="btn btn-primary"
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => this.handleDelete()}
                          type="button"
                          class="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
// Mengambil state dari store dan mempassing nya
// kedalam component App sebagai props
// const mapStateToProps = ({ contacts }) => ({
//   contacts
// });

// Membuat fungsional yang membutuhkan fungsi dispatch
// const mapDispatchToProps = dispatch => ({
//   removeExistingContact: contact => {
//     dispatch(removeContact(contact));
    
//     window.location.replace('/login')
//   }
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ListAll);
export default ListAll