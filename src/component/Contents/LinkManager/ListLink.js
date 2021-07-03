import React, { Component } from "react";
import { Add, GenerateLink } from "./index";
import {
  logout,
  getUser,
  showPriv8,
  DeleteOneLink,
  UpdateOneLink,
} from "../../../Helpers/UserFunctions";
import api from "../../../api";
import { imgVote } from "../../../asset";
// import { connect } from "react-redux";
// import { removeContact } from "../../../redux/actions";
// import { Sugar } from 'react-preloaders';
import { setHeader } from "../../../Helpers/Auth";
import { Doughnut } from "react-chartjs-2";
import { Header } from "../../Shared";
class ListAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllData: [],
      ShareList: [],
      LinkList: [],
      VoteList:[],
      message: {
        code: "",
        votename: "",
        opsi: [],
      },
      form: {
        code: "",
      },
      Vote: null,
      hasilVote: null,
      isLoading: true,
      name: null,
      isSelected: false,
      ShowGen: false,
      jumlahkandidat: {
        title: null,
        jumlah: [],
        kandidat: [],
      },
      jumlahVoters: null,
      Alert: "",
    };
  }

  handleUpdate = (event) => {
    event.preventDefault();

    var { Vote } = this.state;
    console.log(Vote);
    UpdateOneLink(Vote).then((res) => {
      const { alert, reload } = res;
      this.setState({ Alert: alert });
      if (reload) window.location.reload();
    });
  };

  handleDelete = () => {
    var { Vote } = this.state;
    DeleteOneLink(Vote[0].id_url).then((res) => {
      const { alert, reload } = res;
      this.setState({ Alert: alert });
      if (reload) window.location.reload();
    });
  };
  _setError = (key, message) => {
    var obj = this.state.message;
    obj[key] = message;
    this.setState({ message: obj });
    console.log(this.state.message);
  };
  // handleBulkDelete = async () => {
  //   const sharelist = this.state.AllData.filter((el) => el.isChecked && el);
  //   console.log(sharelist);
  //   await api.post("bulkdelete/", sharelist, setHeader());
  //   window.location.reload(false);
  // };

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
      votename: "",
      id_url: list[0].id_url,
      id_vote:""
    });
    this.setState({ Vote: list });
  };
  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    const list = this.state.Vote;
    list[index]["action"] = "hapus";
    console.log(list)
    this.setState({ Vote: list });
  };
  _getVote = async (id) => {
    const response = await api.get("getlink/" + id, setHeader());
    response.data.vote.map((el) => {
      el["id_vote"] = el.id_vote;
      el["action"] = "ubah";
    });
    console.log(response.data.vote);
    this.setState({
      Vote: response.data.vote,
    });
  };

  _getList = async () => {
    console.log(setHeader());
    const response = await api.get("/links", setHeader());
    var result = response.data.votes.map(function (el) {
      var o = Object.assign({}, el);
      o.isChecked = false;
      return o;
    });
    this.setState({
      AllData: result,
      isLoading: false,
    });
    console.log(result);
  };

  _getVoteList = async () => {
    const response = await api.get("/", setHeader());
    var result = response.data.votes.map(function (el) {
      var o = Object.assign({}, el);
      o.isChecked = false;
      return o;
    });
    this.setState({
      VoteList: result,
      isLoading: false,
    });
    console.log(result);
  };

  _getUser = async () => {
    await getUser().then((res) => {
      this.setState({
        name: res,
      });
    });
  };
  handleChecked = async (index) => {
    var datachecked = this.state.AllData;
    datachecked[index].isChecked = await !datachecked[index].isChecked;
    var sharelist = await datachecked.filter((el) => el.isChecked && el);
    this.setState({
      AllData: datachecked,
      ShareList: sharelist,
    });
  };
  // _setPublic(){
  //   this.setState({isPublic:!this.state.isPublic})
  // }
  // _setCode(id){
  //   this.setState({code:id})
  // }

  _handleFormChange = (event) => {
    let formData = { ...this.state.form };
    formData[event.target.name] = event.target.value;
    this.setState({
      form: formData,
      LinkList:
        formData[event.target.name].length > 0 ? this.state.LinkList : [],
    });
  };

  _handleFormSubmit = async () => {
    this.setState({ isSelected: false });
    const code = this.state.form.code;
    if (code === "") {
      this.setState({
        message: { code: "Harap masukan code" },
        LinkList: [],
      });
    } else {
      await showPriv8(code).then((res) =>
        this.setState({ LinkList: res.data })
      );
      console.log(this.state.LinkList);
    }
  };
  handleVoteClick = async (index) => {
    const { Vote } = this.state;
    api.post("sendvote", Vote[index], setHeader()).then((res) => {
      // console.log(res)
      if (res.data === "berhasil") {
        alert("Anda berhasil vote");
        window.location.reload(false);
      } else {
        alert("Anda sudah vote!");
        window.location.reload(false);
      }
    });
  };

  componentDidMount() {
    this._getList();
    this._getVoteList();
    this._getUser();
  }
  render() {
    const { AllData, Vote, name, isSelected, LinkList, VoteList } = this.state;
    // const {contacts,removeExistingContact} = this.props
    return (
      <>
        {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}

        <div class="card-body px-0">
          <div className="row justify-content-end">
            <div className="col-12 col-md-3 mt-3 mt-md-0 text-lg-right">
              {LinkList.length === 0 && (
                <>
                  <div className="row justify-content-between justify-content-lg-end mx-auto">
                    <button
                      class={"btn btn-secondary" + (isSelected ? " mr-3" : "")}
                      onClick={async () => {
                        isSelected &&
                          AllData.map((el) => {
                            el.isChecked = false;
                          });
                        await this.setState({
                          ShareList: [],
                          isSelected: !this.state.isSelected,
                        });
                      }}
                    >
                      {isSelected ? "Deselect" : "Select"}
                    </button>
                    {isSelected && <GenerateLink {...this.state} />}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {(LinkList.length > 0 ? LinkList : AllData).map((el, i) => {
          return (
            <>
              <div className="row mb-3">
                <div className="col-12">
                  <div class="list-group flex-row">
                    <a
                      // href="#"
                      style={{ cursor: "pointer" }}
                      class={"list-group-item w-100 py-2"}
                      onClick={() => {
                        !isSelected
                          ? this._getVote(el.id_url)
                          : this.handleChecked(i);
                      }}
                      data-toggle={!isSelected && "modal"}
                      data-target={!isSelected && "#my-modal"}
                    >
                      {isSelected && (
                        <input
                          className="mr-5"
                          onClick={() => this.handleChecked(i)}
                          checked={el.isChecked}
                          type="checkbox"
                        />
                      )}
                      {el.name ? el.name : el.votename}
                    </a>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        <div
          class="modal fade hasilvote"
          tabindex="-1"
          role="dialog"
          aria-labelledby="my-modal"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {this.state.jumlahkandidat.title}
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
              <div className="modal-body">
                {this.state.jumlahkandidat.kandidat.length > 0 ? (
                  <>
                    <Doughnut
                      data={{
                        labels: this.state.jumlahkandidat.kandidat,
                        datasets: [
                          {
                            label: this.state.jumlahkandidat.title,
                            backgroundColor: [
                              "rgba(255, 99, 132, 0.6)",
                              "rgba(54, 162, 235, 0.6)",
                              "rgba(255, 206, 86, 0.6)",
                              "rgba(75, 192, 192, 0.6)",
                              "rgba(153, 102, 255, 0.6)",
                            ],
                            // borderColor: 'rgb(255, 99, 132)',
                            data: this.state.jumlahkandidat.jumlah,
                          },
                        ],
                      }}
                    />
                    <table class="table table-bordered mt-5 text-center">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Email</th>
                          <th scope="col">Pilihan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.jumlahVoters != null &&
                          this.state.jumlahVoters.map((voter, i) => (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{voter.email}</td>
                              <td scope="row">{voter.pilih}</td>
                            </tr>
                          ))}
                        {this.state.jumlahVoters != null && (
                          <tr class="table-active">
                            <td colspan="2">Jumlah voter</td>
                            <td scope="row">
                              {this.state.jumlahVoters.length}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <h3 className="text-center m-5 text-uppercase">
                    Belum ada yang vote
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="my-modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="my-modal"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {Vote !== null ? Vote[0].id_url : "kosong"}
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
                <div class="modal-body px-4">
                  <div
                    className="Features"
                    dangerouslySetInnerHTML={{ __html: this.state.Alert }}
                  />
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">
                      Url Vote:
                    </label>
                    <input
                      type="text"
                      name="id_url"
                      class="form-control"
                      onChange={(e) => this.handleTitleChange(e)}
                      value={Vote !== null ? Vote[0].id_url : "kosong"}
                      id="recipient-title"
                    />
                  </div>
                  
                  {
                                    <button
                                      type="button"
                                      class="btn btn-primary mr-3"
                                      onClick={() => this.handleAddClick()}
                                    >
                                    + Tambah vote
                                    </button>}
                  <div className={LinkList.length > 0 && "row mt-3"}>
                    {Vote &&
                      Vote.map((element, i) => {
                        return (
                          <>
                            {element.action !== "hapus" && (
                              <>
                                <div class="form-group">
                                  <label
                                    for="recipient-name"
                                    class="col-form-label"
                                  >
                                    Nama vote:
                                  </label>

                                  <select
                                    class="custom-select"
                                    id="inputGroupSelect01"
                                    name="id_vote"
                                    onChange={(e) =>
                                      this.handleCandidateChange(e, i)
                                    }
                                  >
                                    <option selected value={element.id_vote}>{element.votename}</option>
                                    {VoteList && VoteList.map((option)=>{
                                      return option.name !== element.votename?
                                    <>
                                        <option value={option.id_vote}>{option.name}</option>
                                    </>
                                    :''
                                    })}
                                  </select>
                                  
                                </div>
                                <div className="form-group">
                                  {Vote.length !== 1 && (
                                    <button
                                      type="button"
                                      class="btn btn-danger mr-3"
                                      onClick={() => this.handleRemoveClick(i)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </>
                        );
                      })}
                  </div>
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
export default ListAll;
