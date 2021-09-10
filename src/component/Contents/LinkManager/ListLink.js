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
import { Button, Select, Input  } from 'antd';
class ListAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllData: [],
      ShareList: [],
      LinkList: [],
      VoteList: [],
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

  handleUpdate = () => {
    // event.preventDefault();

    var { Vote } = this.state;
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
  handleCandidateChange = (name,value, index) => {
    // const { name, value } = e.target;
    let list = this.state.Vote;
    list[index][name] = value;
    this.setState({ Vote: list });
    console.log(this.state.Vote)
  };
  // handle click event of the Add button
  handleAddClick = () => {
    const list = this.state.Vote;
    list.push({
      action: "tambah",
      id: null,
      votename: "",
      id_url: list[0].id_url,
      id_vote: "",
    });
    this.setState({ Vote: list });
  };
  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    const list = this.state.Vote;
    list[index]["action"] = "hapus";
    console.log(list);
    this.setState({ Vote: list });
  };
  _getVote = async (id) => {
    await this.setState({Vote:null})
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
    const response = await api.get("/AllVote", setHeader());
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
    const { Option } = Select;
    const { AllData, Vote, name, isSelected, LinkList, VoteList } = this.state;
    // const {contacts,removeExistingContact} = this.props
    return (
      <>
        {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}
        <div className="col">
          <div className="row mb-3">
            <div className={"col-12 "+(isSelected ? "col-md-4 pr-lg-4 text-lg-left" : "col-md-1 text-lg-left")+" mt-3 mt-md-0 align-self-center"}>
              {LinkList.length === 0 && (
                <>
                    
              <Button
              class={"ant-btn "+(isSelected ? " mr-3" : "")}
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
                href="#"
                data-toggle="modal"
                data-target="#addModal"
              >
                {isSelected ? "Deselect" : "Select"}
              </Button>
                    {isSelected && <GenerateLink {...this.state} />}
                </>
              )}
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
                            className="mr-3"
                            onClick={() => this.handleChecked(i)}
                            checked={el.isChecked}
                            type="checkbox"
                          />
                        )}
                        {process.env.REACT_APP_BASEURL + "voting/" + el.name}
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
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
                  {Vote !== null
                    ? process.env.REACT_APP_BASEURL + "voting/" + Vote[0].id_url
                    : "kosong"}
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
                    <Input
                      type="text"
                      name="id_url"
                      onChange={(e) => this.handleTitleChange(e)}
                      value={Vote !== null ? Vote[0].id_url : "kosong"}
                      id="recipient-title"
                    />
                  </div>

                  {
                    <Button
                      type="primary"
                      onClick={() => this.handleAddClick()}
                    >
                      + Add Option
                    </Button>
                  }
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

                                  <Select 
                                  className="w-100"
                                  defaultValue={element.votename!==null && element.votename}
                                    name="id_vote"
                                    onChange={(value)=>this.handleCandidateChange("id_vote",value, i)
                                    }>
                                    {VoteList &&
                                      VoteList.map((option,ind) => 
                                            <Option key={ind} value={option.id_vote}>
                                              {option.name}
                                            </Option>)}
      </Select>
                                </div>
                                <div className="form-group">
                                  {Vote.length !== 1 && (
                                    <Button
                                    danger
                                      onClick={() => this.handleRemoveClick(i)}
                                    >
                                      Remove
                                    </Button>
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
                    <Button
                      data-dismiss="modal"
                      size={"large"}
                    >
                      Close
                    </Button>
                    <Button
                      type="primary"
                      size={"large"}
                      onClick={this.handleUpdate}
                      className="bg-success text-white border-0"
                    >
                      Update
                    </Button>
                    <Button
                    danger
                    type="primary"
                      size={"large"}
                      onClick={(e) => this.handleDelete()}
                    >
                      Delete
                    </Button>
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
