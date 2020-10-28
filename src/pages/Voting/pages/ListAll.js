import React, { Component } from "react";
import { Add, GenerateLink } from "../../../component";
import { logout, getUser, showPriv8 } from "../../../utils/UserFunctions";
import api from "../../../api";
import { imgVote } from "../../../asset";
// import { connect } from "react-redux";
// import { removeContact } from "../../../redux/actions";
// import { Sugar } from 'react-preloaders';
import { setHeader } from "../../../Helpers/Auth";
import {Doughnut} from 'react-chartjs-2';

class ListAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllData: [],
      ShareList: [],
      LinkList: [],
      messageErr: "",
      form: {
        code: "",
      },
      Vote: null,
      hasilVote: null,
      isLoading: true,
      name: null,
      isSelected: false,
      ShowGen: false,
      jumlahkandidat:{
        title:null,
        jumlah:[],
        kandidat:[]
      }
    };
  }

  handleUpdate = (event) => {
    event.preventDefault();

    var { Vote } = this.state;
    console.log(Vote);
    api.post("update", { Vote }, setHeader()).then((res) => {
      window.location.reload(false);
    });
  };

  handleDelete = () => {
    var { Vote } = this.state;
    api.get("delete/" + Vote[0].id_vote, setHeader()).then((res) => {
      window.location.reload(false);
    });
  };

  handleBulkDelete = async () => {
    const sharelist = this.state.AllData.filter((el) => el.isChecked && el);
    console.log(sharelist);
    await api.post("bulkdelete/", sharelist, setHeader());
    window.location.reload(false);
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
  _getVote = async (id) => {
    const response = await api.get("get/" + id, setHeader());
    const list = response.data.vote.map((el) => {
      el["id_vote"] = id;
      el["action"] = "ubah";
    });
    this.setState({
      Vote: response.data.vote,
    });
  };


  _getHasilVote = async(title,obj)=>{
    var jumlah = []
    var kandidat = []
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
    } else {
      this.setState({
        jumlahkandidat: {
          title: null,
          jumlah: [],
          kandidat: [],
        },
      });
    }
  }

  _getResult = async (e) => {
    var id = e.currentTarget.attributes.getNamedItem("data-id").value;
    const response = await api.get("get/" + id, setHeader());
    const list = response.data.vote.map((el) => {
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
    console.log(result)
  };
  _getUser = async () => {
    await getUser().then((res) => {
      this.setState({
        name: res.data.name,
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

  _handleFormSubmit = async() => {
    this.setState({ isSelected: false });
    const code = this.state.form.code;
    if (code === "") {
      this.setState({
        messageErr: "Harap masukan code",
        LinkList: [],
      });
    } else {
      await showPriv8(code).then((res) => this.setState({ LinkList: res.data }));
      console.log(this.state.LinkList)
    }
  };
  handleVoteClick = async (index) => {
    const { Vote } = this.state;
    api.post("sendvote", Vote[index], setHeader()).then((res) => {
      window.location.reload(false);
    });
  };

  componentDidMount() {
    this._getList();
    this._getUser();
  }
  render() {
    const { AllData, Vote, name, isSelected, ShareList, LinkList } = this.state;
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
                <a class="list-group-item">
                  <i class="fa fa-user-circle"></i> My Profile
                </a>
                <a class="list-group-item">
                  <i class="fa fa-user-circle"></i> Manage Links
                </a>
                <a
                  href="#"
                  class="list-group-item"
                  onClick={() => logout()}
                  style={{ color: "#212529" }}
                >
                  <i class="fa fa-sign-out-alt"></i> Logout
                </a>
              </ul>
            </div>
            <div class="col-md-9">
              <div class="card mb-5">
                <div class="card-body px-5">
                  <div
                    className="row"
                    data-aos="zoom-in"
                    data-aos-duration="700"
                    data-aos-delay="50"
                  >
                    <div className="col-md-6 pt-5 mt-2">
                      <span className="title">evoting app</span>
                      <br />
                      <span className="subtitle mt-1 mb-2">
                        Selamat datang {name} di aplikasi evoting. Silahkan
                        masukan code jika memiliki code untuk Private Vote.
                      </span>
                    </div>
                    <div className="col-md-6 pt-5 text-center">
                      <img
                        src={imgVote}
                        alt=""
                        width="400"
                        className="img-fluid"
                        data-aos="zoom-in"
                        data-aos-duration="700"
                        data-aos-delay="50"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body px-0">
                <div className="row justify-content-center">
                  <div className="col">
                    <a
                      href="#"
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#addModal"
                    >
                      + Create your own vote
                    </a>
                    <Add />
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        name="code"
                        onChange={this._handleFormChange}
                        id=""
                        className="form-control"
                        placeholder="Masukan code disini"
                        value={this.state.form.code}
                      />
                      <small className="text-danger">
                        {this.state.messageErr}
                      </small>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary mr-2"
                        onClick={this._handleFormSubmit}
                      >
                        Enter
                      </button>
                    </div>
                  </div>
                  <div className="col text-right">
                    {LinkList.length === 0 && (
                      <>
                        <button
                          class={"btn btn-secondary"+ (isSelected ? " mr-3" : "")}
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
                      </>
                    )}
                  </div>
                </div>
              </div>
              {(LinkList.length > 0 ? LinkList : AllData).map((el, i) => {
                return (
                  <>
                    <div className="row mb-3">
                      <div className="col">
                        <div class="list-group flex-row">
                          <a
                            href="#"
                            class={"list-group-item w-100 mr-3"}
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
                          {LinkList.length === 0 && 
                            <button type="button" onClick={()=>this._getHasilVote(el.name,el.jumlahkandidat)} class="btn btn-primary" data-toggle="modal" data-target=".hasilvote">Hasil vote</button>}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              <div class="modal fade hasilvote"
              tabindex="-1"
              role="dialog"
              aria-labelledby="my-modal"
              aria-hidden="true">
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
                {this.state.jumlahkandidat.kandidat.length>0?
                  <Doughnut data= {{
                    labels: this.state.jumlahkandidat.kandidat,
                    datasets: [{
                    label: this.state.jumlahkandidat.title,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)'
                  ],
                    // borderColor: 'rgb(255, 99, 132)',
                    data: this.state.jumlahkandidat.jumlah,
                    }]
                }} />:<h3 className="text-center m-5 text-uppercase">Belum ada yang vote</h3>}
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
                <div class="modal-dialog modal-lg" role="document">
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
                        {LinkList.length === 0 ? (
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              Nama Vote:
                            </label>
                            <input
                              type="text"
                              name="votename"
                              class="form-control"
                              onChange={(e) => this.handleTitleChange(e)}
                              value={
                                Vote !== null ? Vote[0].votename : "kosong"
                              }
                              id="recipient-title"
                            />
                          </div>
                        ) : (
                          <div className="row">
                          <div className="col-12 justify-content-center text-center mt-2">
                            <h1>{Vote && Vote[0].votename}</h1>
                          </div>
                          </div>
                        )}
                        <div className={LinkList.length>0&&"row mt-3"}>
                        
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
                                    )}
                                  </>
                                ) : (
                                  <div class="col col-md-6 mt-2">
                                    <div class="card">
                                      <div class="card-body">
                                        <h5 class="card-title text-center">
                                          {element.kandidat}
                                        </h5>
                                        <div className="text-center">
                                        <a
                                          href="#"
                                          onClick={(e) =>
                                            this.handleVoteClick(i)
                                          }
                                          class="btn btn-primary"
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
