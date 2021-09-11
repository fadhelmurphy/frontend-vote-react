import React, { Component } from "react";
import { ModalGenerateLink } from "./index";
import {
  logout,
  getUser,
  showPriv8,
  DeleteOneVote,
  UpdateOneVote,
  deleteVoter,
  bulkDelete,
} from "../../../Helpers/UserFunctions";
import api from "../../../api";
// import { connect } from "react-redux";
// import { removeContact } from "../../../redux/actions";
// import { Sugar } from 'react-preloaders';
import { setHeader } from "../../../Helpers/Auth";
import { Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AddVoteButton, DeleteButton, HasilButton } from "../../Shared/Button";
import { List } from "../../Shared";

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
        id_vote: [],
      },
      jumlahVoters: null,
      Alert: "",
    };
    this.handleDeleteVoter = this.handleDeleteVoter.bind(this);
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

  handleDeleteVoter = (email) => {
    const { id_vote } = this.state.jumlahkandidat;
    deleteVoter({ email, id_vote });
  };

  // handleDelete = () => {
  //   var { Vote } = this.state;
  //   DeleteOneVote(Vote[0].id_vote).then((res) => {
  //     const { alert, reload } = res;
  //     this.setState({ Alert: alert });
  //     if (reload) window.location.reload();
  //   });
  // };
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
      kandidatImage: "kosong",
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
    this.setState({Vote:null})
    const response = await api.get("get/" + id, setHeader());
    response.data.vote.map((el) => {
      el["id_vote"] = id;
      el["action"] = "ubah";
      // el["kandidatImage"] = "";
    });
    this.setState({
      Vote: response.data.vote,
    });
  };

  _getHasilVote = async (title, obj, jumlahVoters, id_vote) => {
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
            id_vote,
          },
        });
      });
      this.setState({ jumlahVoters });
    } else {
      this.setState({
        jumlahkandidat: {
          title: null,
          jumlah: [],
          kandidat: [],
        },
        jumlahVoters: null,
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
    const response = await api.get("AllVote", setHeader());
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

  // File Upload

  onImageChange = ({ file: newFile }, index) => {
    const { Vote } = this.state;
    var list = Vote;
    if (newFile.status === "removed") {
      list[index]["kandidatImage"] = "";
      this.setState({ list });
    } else if (newFile.status === "done") {
      newFile.name = list[index]["kandidat"] + "-" + list[index].votename;
      list[index]["kandidatImage"] = newFile;
      this.setState({ list });
    }
    console.log(list);
  };

  onImagePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  componentDidMount() {
    this._getList();
    this._getUser();
  }
  render() {
    const { AllData, Vote, name, isSelected, LinkList } = this.state;
    // const {contacts,removeExistingContact} = this.props
    console.log(Vote);
    return (
      <>
        {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}

        <div className="col">
          <div className="row mb-3">
            <div className="col-12 col-md-2 align-self-center">
              <AddVoteButton
                _setError={(key, message) => {
                  this._setError(key, message);
                }}
                {...this.state}
              />
            </div>

            <div
              className={
                "col-12 " +
                (isSelected ? "col-md-4" : "col-md-8") +
                " mt-3 mt-md-0 align-self-center"
              }
            >
              <div className="row">
                <div className="col-8 col-md-10">
                  <Input
                    type="text"
                    name="code"
                    onChange={this._handleFormChange}
                    placeholder="masukkan code voting"
                    required
                  />
                </div>
                <div className="col-3 col-md-2">
                  <Button type="primary" onClick={this._handleFormSubmit}>
                    Enter
                  </Button>
                </div>
              </div>

              <small className="text-danger">{this.state.message.code}</small>
            </div>
            <div
              className={
                "col-12 " +
                (isSelected
                  ? "col-md-6 text-lg-right"
                  : "col-md-2 text-lg-center") +
                " mt-3 mt-md-0 align-self-center"
              }
            >
              {LinkList.length === 0 && (
                <>
                  <Button
                    class={"ant-btn " + (isSelected ? "mr-3" : "")}
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
                  </Button>
                  {isSelected && (
                    <>
                      <ModalGenerateLink {...this.state} />
                      <DeleteButton
                        Data={AllData.filter((el) => el.isChecked && el)}
                        DeleteFunc={(value) =>
                          bulkDelete(value).then((res) => {
                            const { alert, reload } = res;
                            this.setState({ Alert: alert });
                            if (reload) window.location.reload();
                          })
                        }
                        size="default"
                      >
                        Delete
                      </DeleteButton>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {(LinkList.length > 0 ? LinkList : AllData).map((el, i) => {
            return (
              <>
                <div className="row mb-3">
                  <div
                    className={
                      LinkList.length === 0 ? "col-8 col-md-10" : "col-12"
                    }
                  >
                    <List
                      isSelected={isSelected}
                      el={el}
                      i={i}
                      _getVote={(value) => this._getVote(value)}
                      handleChecked={(value) => this.handleChecked(value)}
                    />
                  </div>
                  <div className="col-3 col-md-2 text-center">
                    {LinkList.length === 0 && (
                      <div
                        onClick={() =>
                          this._getHasilVote(
                            el.name,
                            el.jumlahkandidat,
                            el.jumlahVoters,
                            el.id_vote
                          )
                        }
                      >
                        <HasilButton
                          {...this.state}
                          handleDeleteVoter={(value) =>
                            this.handleDeleteVoter.bind(this, value)
                          }
                        />
                      </div>
                    )}
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
                        <Input
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

                  {LinkList.length === 0 && (
                    <Button
                      type="primary"
                      onClick={() => this.handleAddClick()}
                    >
                      + Add option
                    </Button>
                  )}
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
                                      <Input
                                        type="text"
                                        name="kandidat"
                                        onChange={(e) =>
                                          this.handleCandidateChange(e, i)
                                        }
                                        value={element.kandidat}
                                        id="recipient-title"
                                      />
                                    </div>
                                    <div className="form-group">
                                      {" "}
                                      {Vote.length !== 1 && (
                                        <Button
                                          onClick={() =>
                                            this.handleRemoveClick(i)
                                          }
                                          danger
                                        >
                                          Remove
                                        </Button>
                                      )}
                                    </div>
                                    <div className="form-group">
                                      <Upload
                                        listType="picture"
                                        customRequest={this.dummyRequest}
                                        maxCount={1}
                                        onChange={(fileList) =>
                                          this.onImageChange(fileList, i)
                                        }
                                        onPreview={this.onImagePreview}
                                        defaultFileList={
                                          element.kandidatImage !== "kosong"
                                            ? [
                                                {
                                                  uid: -1,
                                                  name: element.kandidatImage,
                                                  status: "done",
                                                  url:
                                                    process.env
                                                      .REACT_APP_BACKEND +
                                                    "storage/" +
                                                    element.kandidatImage,
                                                  thumbUrl:
                                                    process.env
                                                      .REACT_APP_BACKEND +
                                                    "storage/" +
                                                    element.kandidatImage,
                                                },
                                              ]
                                            : ""
                                        }
                                        beforeUpload={(file) => {
                                          const isJPG =
                                            file.type === "image/jpeg" ||
                                            file.type === "image/png";
                                          if (!isJPG) {
                                            alert(
                                              "You can only upload JPG or PNG file!"
                                            );
                                            return false;
                                          } else {
                                            return true;
                                          }
                                        }}
                                        // onRemove={onImageRemove}
                                      >
                                        <Button icon={<UploadOutlined />}>
                                          {" "}
                                          Upload
                                        </Button>
                                      </Upload>
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
                    <Button data-dismiss="modal" size={"large"}>
                      Close
                    </Button>
                    <Button
                      type="primary"
                      size={"large"}
                      onClick={(e) => this.handleUpdate(e)}
                      className="bg-success text-white border-0"
                    >
                      Update
                    </Button>

                    <DeleteButton
                      Data={Vote != null && Vote[0].id_vote}
                      DeleteFunc={(val) =>
                        DeleteOneVote(val).then((res) => {
                          const { alert, reload } = res;
                          this.setState({ Alert: alert });
                          if (reload) window.location.reload();
                        })
                      }
                      size="large"
                    />
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
