import React, { Component } from "react";
import {
  getUser,
  showPriv8,
  DeleteOneLink,
  UpdateOneLink,
  bulkDeleteLinks,
} from "../../../Helpers/UserFunctions";
import api from "../../../api";
import { imgVote } from "../../../asset";
// import { connect } from "react-redux";
// import { removeContact } from "../../../redux/actions";
// import { Sugar } from 'react-preloaders';
import { setHeader } from "../../../Helpers/Auth";
import { Doughnut } from "react-chartjs-2";
import { Header } from "../../Shared";
import { Button, Select, Input, Form } from "antd";
import { List } from "../../Shared";
import {  DeleteButton } from "../../Shared/Button";
import { CheckOutlined,CloseOutlined,EyeOutlined } from "@ant-design/icons";
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

  // handleDelete = () => {
  //   var { Vote } = this.state;
  //   DeleteOneLink(Vote[0].id_url).then((res) => {
  //     const { alert, reload } = res;
  //     this.setState({ Alert: alert });
  //     if (reload) window.location.reload();
  //   });
  // };
  _setError = (key, message) => {
    var obj = this.state.message;
    obj[key] = message;
    this.setState({ message: obj });
  };
  // handleBulkDelete = async () => {
  //   const sharelist = this.state.AllData.filter((el) => el.isChecked && el);
  //   console.log(sharelist);
  //   await api.post("bulkdelete/", sharelist, setHeader());
  //   window.location.reload(false);
  // };

  // handle input change
  handleTitleChange = (e, index) => {
    var { name, value } = e.target;
    value = value.replace(/[^A-Za-z]/ig, '')
    const list = this.state.Vote;
    list.map((el, i) => {
      this.state.Vote[i][name] = value;
    });
    this.setState({ Vote: list });
  };

  // handle input change
  handleCandidateChange = (name, value, index) => {
    // const { name, value } = e.target;
    let list = this.state.Vote;
    list[index][name] = value;
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
      id_vote: "",
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
    this.setState({Vote:null})
    const response = await api.get("getlink/" + id, setHeader());
    response.data.vote.map((el) => {
      // el["id_vote"] = el.id_vote;
      el["action"] = "ubah";
    });
    this.setState({
      Vote: response.data.vote,
    });
    console.log(this.state.Vote)
  };

  _getList = async () => {
    const response = await api.get("/links", setHeader());
    var result = response.data.votes.map(function (el) {
      var o = Object.assign({}, el);
      o.isChecked = false;
      o.name = el.id_url;
      o.id_vote = el.id_url;
      return o;
    });
    this.setState({
      AllData: result,
      isLoading: false,
    });
  };

  _getVoteList = async () => {
    this.setState({Vote:null})
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
            <div
              className={
                "col-12 " +
                (isSelected
                  ? "col-md-4 pr-lg-4 text-lg-left"
                  : "col-md-1 text-lg-left") +
                " mt-3 mt-md-0 align-self-center"
              }
            >
              {LinkList.length === 0 && (
                <>
                  <Button
                    className={"ant-btn shadow-sm " + (isSelected ? "mr-3" : " text-primary border-primary")}
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
                    {isSelected ? 
                    <>
                  <CloseOutlined 
                  className="align-self-center py-auto"
                  style={{ verticalAlign: "0" }}/>{" Deselect" }</>: <>
                  <CheckOutlined 
                  className="align-self-center py-auto"
                  style={{ verticalAlign: "0" }}/>{" Select"}</>}
                  </Button>
                  {
                    isSelected && (
                      // <BulkDeleteButton
                      //   bulkDelete={(value) => bulkDeleteLinks(value)}
                      //   {...this.state}
                      // >
                      //   Delete
                      // </BulkDeleteButton>

                      <DeleteButton
                        Data={AllData.filter((el) => el.isChecked && el)}
                        DeleteFunc={(value) => {
                          bulkDeleteLinks(value).then((res) => {
                            const { reload } = res;
                            if (reload) window.location.reload(true);
                          });
                        }}
                        size="default"
                      ></DeleteButton>
                    )
                    // <GenerateLink {...this.state} />
                  }
                </>
              )}
            </div>
          </div>
          {(LinkList.length > 0 ? LinkList : AllData).map((el, i) => {
            return (
              <>
                <div className="row mb-3">
                  <div className="col-12">
                    <List
                    LinkPage={true}
                    Editable={true}
                      isSelected={isSelected}
                      el={el}
                      i={i}
                      _getVote={(value) => this._getVote(value)}
                      handleChecked={(value) => this.handleChecked(value)}
                    />
                    {/* <div class="list-group flex-row">
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
                    </div> */}
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
              <div class="modal-header justify-content-start">
                <button
                className="mr-3"
                  type="button"class="close m-0 p-2 mr-2" 
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title align-self-center text-truncate" id="exampleModalLabel">
                 {Vote !== null ? process.env.REACT_APP_BASEURL+"voting/" +Vote[0].id_url : "kosong"}
                </h5>
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
                    onkeypress="return /[a-z]/i.test(event.key)" 
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
                                    defaultValue={
                                      element.votename !== null &&
                                      element.votename
                                    }
                                    name="id_vote"
                                    onChange={(value) =>
                                      this.handleCandidateChange(
                                        "id_vote",
                                        value,
                                        i
                                      )
                                    }
                                  >
                                    {VoteList &&
                                      VoteList.map((option, ind) => (
                                        <Option
                                          key={ind}
                                          value={option.id_vote}
                                        >
                                          {option.name}
                                        </Option>
                                      ))}
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
                  <Button data-dismiss="modal" size={"large"}>
                    Close
                  </Button>
                  <Button
                    type="primary"
                    size={"large"}
                    target="_blank"
                    href={
                      Vote !== null &&
                      process.env.REACT_APP_BASEURL + "voting/" + Vote[0].id_url
                    }
                    className="bg-primary text-white border-0"
                  >
                   <EyeOutlined 
                  className="align-self-center py-auto"
                  style={{ verticalAlign: "0" }}/> View
                  </Button>
                  <Button
                    type="primary"
                    size={"large"}
                    onClick={this.handleUpdate}
                    className="bg-success text-white border-0"
                  >
                    Update
                  </Button>
                  <DeleteButton
                    Data={Vote !== null && Vote[0].id_url}
                    DeleteFunc={(value) => {
                      DeleteOneLink(value).then((res) => {
                        const { alert, reload } = res;
                        this.setState({ Alert: alert });
                        if (reload) window.location.reload();
                      });
                    }}
                    size="large"
                  ></DeleteButton>
                  {/* <Button
                    danger
                    type="primary"
                    size={"large"}
                    // onClick={(e) => this.handleDelete()}
                  >
                    Delete
                  </Button> */}
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
