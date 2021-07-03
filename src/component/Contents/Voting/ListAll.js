import React, { Component } from "react";
import { Add, GenerateLink } from "./index";
import {
  logout,
  getUser,
  showPriv8,
  DeleteOneVote,
  UpdateOneVote,
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
      jumlahVoters:null,
      Alert: "",
    };
  }

  handleUpdate = (event) => {
    event.preventDefault();

    var { Vote } = this.state;
    console.log(Vote);
    UpdateOneVote(Vote).then((res) => {
      const { alert, reload } = res;
      this.setState({ Alert: alert });
      if (reload) window.location.reload();
    });
  };

  handleDelete = () => {
    var { Vote } = this.state;
    DeleteOneVote(Vote[0].id_vote).then((res) => {
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
  _getVote = async (id) => {
    const response = await api.get("get/" + id, setHeader());
    response.data.vote.map((el) => {
      el["id_vote"] = id;
      el["action"] = "ubah";
    });
    this.setState({
      Vote: response.data.vote,
    });
  };

  _getHasilVote = async (title, obj,jumlahVoters) => {
    var jumlah = [];
    var kandidat = [];
    function isEmpty(o) {
      return Object.entries(o).every(([k, v]) => v === null);
    }
    if (!isEmpty(obj)) {
      await Object.entries(obj).forEach((entry) => {
        const [key, value] = entry;
        kandidat.push(key);
        jumlah.push(value);
        this.setState({
          jumlahkandidat: {
            title: title,
            jumlah: jumlah,
            kandidat: kandidat,
          },
        });
      });
      this.setState({jumlahVoters})
    } else {
      this.setState({
        jumlahkandidat: {
          title: null,
          jumlah: [],
          kandidat: [],
        },
        jumlahVoters:null
      });
    }
  };

  _getResult = async (e) => {
    var id = e.currentTarget.attributes.getNamedItem("data-id").value;
    const response = await api.get("get/" + id, setHeader());
    response.data.vote.map((el) => {
      el["id_vote"] = id;
      el["action"] = "ubah";
    });
    this.setState({
      Vote: response.data.vote,
    });
  };

  _getList = async () => {
    console.log(setHeader());
    const response = await api.get("", setHeader());
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
    this._getUser();
  }
  render() {
    const { AllData, Vote, name, isSelected, LinkList } = this.state;
    // const {contacts,removeExistingContact} = this.props
    return (
      <>
        {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}

        <div class="card-body px-0">
          <div className="row justify-content-between">
            <div className="col-12 col-md-3">
              <button
                href="#"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#addModal"
              >
                + Create your own vote
              </button>
              <Add
                _setError={(key, message) => {
                  this._setError(key, message);
                }}
                {...this.state}
              />
            </div>

            <div className="col-12 col-md-3 mt-3 mt-md-0">
              <div className="row">
                <div className="col-9">
                  <input
                    type="text"
                    name="code"
                    onChange={this._handleFormChange}
                    id=""
                    className="form-control"
                    placeholder="Masukan code disini"
                    value={this.state.form.code}
                  />
                </div>
                <div className="col-3">
                  <button
                    className="btn btn-primary"
                    onClick={this._handleFormSubmit}
                  >
                    Enter
                  </button>
                </div>
              </div>

              <small className="text-danger">{this.state.message.code}</small>
            </div>
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
                <div className={LinkList.length === 0 ? "col-10" : "col-12"}>
                  <div class="list-group flex-row">
                    <a
                      // href="#"
                      style={{ cursor: "pointer" }}
                      class={"list-group-item w-100 py-2"}
                      onClick={() => {
                        !isSelected
                          ? this._getVote(el.id_vote)
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
                <div className="col-2">
                  {LinkList.length === 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        this._getHasilVote(el.name, el.jumlahkandidat,el.jumlahVoters)
                      }
                      class="btn btn-primary w-100 h-100"
                      data-toggle="modal"
                      data-target=".hasilvote"
                    >
                      Hasil vote
                    </button>
                  )}
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
                        {
                        this.state.jumlahVoters!=null && this.state.jumlahVoters.map((voter,i)=>(
                        <tr>
                          <th scope="row">{i+1}</th>
                          <td>{voter.email}</td>
                          <td scope="row">{voter.pilih}</td>
                        </tr>
                        ))
                        
                        }
                        {this.state.jumlahVoters!=null &&
                        <tr class="table-active">
                          <td colspan="2">Jumlah voter</td>
                          <td scope="row">{this.state.jumlahVoters.length}</td>
                        </tr>}
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
                <div class="modal-body px-4">
                  {LinkList.length === 0 ? (
                    <>
                      <div
                        className="Features"
                        dangerouslySetInnerHTML={{ __html: this.state.Alert }}
                      />
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
                    </>
                  ) : (
                    <div className="row">
                      <div className="col-12 justify-content-center text-center mt-2">
                        <h1>{Vote && Vote[0].votename}</h1>
                      </div>
                    </div>
                  )}
      
      {LinkList.length === 0 &&(
                                    <button
                                      type="button"
                                      class="btn btn-primary mr-3"
                                      onClick={() => this.handleAddClick()}
                                    >
                                    + Add option
                                    </button>)}
                  <div className={LinkList.length > 0 && "row mt-3"}>
                    {Vote &&
                      Vote.map((element, i) => {
                        return (
                          <>
                            {LinkList.length === 0 ? (
                              <>
                                {element.action !== "hapus" && (
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
                                )}
                              </>
                            ) : (
                              <div class="col col-md-6 mt-2">
                                <div class="card border-0 shadow rounded-lg mb-4">
                                  <img
                                    class="card-img-top"
                                    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22362%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20362%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_175c6c72523%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_175c6c72523%22%3E%3Crect%20width%3D%22362%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22134.953125%22%20y%3D%22108.1%22%3E362x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                    alt="Card image cap"
                                  />
                                  <div class="card-body">
                                    <h5 class="card-title text-center">
                                      {element.kandidat}
                                    </h5>
                                    <div className="text-center">
                                      <a
                                        // href="#"
                                        onClick={(e) => this.handleVoteClick(i)}
                                        class="btn btn-primary w-100 active"
                                        style={{ cursor: "pointer" }}
                                      >
                                        Vote
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                  </div>
                </div>
                {LinkList.length === 0 && (
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
                )}
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
