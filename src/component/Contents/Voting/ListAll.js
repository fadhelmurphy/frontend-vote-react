import React, { Component } from "react";
import { ModalGenerateLink } from "./index";
import {
  logout,
  getUser,
  showPriv8,
  DeleteOneVote,
  UpdateOneVote,
  deleteVoter,
  bulkDelete
} from "../../../Helpers/UserFunctions";
import api from "../../../api";
// import { connect } from "react-redux";
// import { removeContact } from "../../../redux/actions";
// import { Sugar } from 'react-preloaders';
import { setHeader } from "../../../Helpers/Auth";
import { Upload, Button, Input } from "antd";
import { UploadOutlined,CheckOutlined,CloseOutlined } from "@ant-design/icons";
import { DeleteButton } from "../../Shared/Button";
import { HasilModal,AddModal,EditModal,ShareModal } from "../../Shared/Modal";
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
      showHasilModal:false,
      showAddModal:this.props.showAddModal,
      showEditModal:false,
      showShareModal:false,

    };
    // this.handleDeleteVoter = this.handleDeleteVoter.bind(this);
  }

  
  handleDeleteVoter = (email) => {
    const { id_vote } = this.state.jumlahkandidat;
    deleteVoter({ email, id_vote });
  };

  _getVote = async (id) => {
    this.setState({Vote:null})
    const response = await api.get("get/" + id, setHeader());
    response.data.vote.map((el) => {
      el["id_vote"] = id;
      el["action"] = "ubah";
      // el["kandidatImage"] = "";
    });
    console.log(response.data.vote)
    this.setState({
      Vote: response.data.vote,
      VoteResult: response.data.result,
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

  // _getResult = async (e) => {
  //   var id = e.currentTarget.attributes.getNamedItem("data-id").value;
  //   const response = await api.get("get/" + id, setHeader());
  //   response.data.vote.map((el) => {
  //     el["id_vote"] = id;
  //     el["action"] = "ubah";
  //   });
  //   this.setState({
  //     Vote: response.data.vote,
  //   });
  // };

  _getList = async () => {
    const response = await api.get("AllVote", setHeader());
    var result = response.data.votes.map(function (el) {
      var o = Object.assign({}, el);
      o.isChecked = false;
      return o;
    });
    console.log(response)
    this.setState({
      AllData: result,
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
    let LinkList = this.state.AllData
    const match = (s) => {
      const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.toLowerCase().substr(i)}]*?${v}`, '');
      const re = RegExp(p);
      
      return LinkList.filter(({name}) => name.toLowerCase().match(re));
    };
    LinkList = match(event.target.value)
    this.setState({
      form: formData,
      LinkList:
        formData[event.target.name].length > 0 ? LinkList : [],
    });
  };

  // _handleFormSubmit = async () => {
  //   this.setState({ isSelected: false });
  //   const code = this.state.form.code;
  //   if (code === "") {
  //     this.setState({
  //       message: { code: "Harap masukan code" },
  //       LinkList: [],
  //     });
  //   } else {
  //     let LinkList = this.state.AllData
  //     LinkList = LinkList.filter(el=>el.name.toLowerCase()===code.toLowerCase())
  //     // await showPriv8(code).then((res) =>
  //       this.setState({ LinkList })
  //     ;
  //     // console.log(this.state.LinkList);
  //   }
  // };
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
      newFile.name = list[index]["kandidat"] + "-" + list[index].votename+ "." +newFile.originFileObj.name.split('.')[1];
      list[index]["kandidatImage"] = newFile;
      this.setState({ list });
    }
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
    const { AllData, Vote, VoteResult, isSelected, LinkList, showHasilModal } = this.state;
    
    return (
      <>
        {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}

        <div className="col">
          <div className="row mb-3">
            <div className="d-none d-md-block col-12 col-md-1 align-self-center">
              
      <Button
        type="primary"
        // href="#"
        // data-toggle="modal"
        // data-target="#addModal"
        onClick={()=>this.props.setState({showAddModal:true})}
      >
        +
      </Button>
              {/* <AddVoteButton
              setState={(val)=>this.setState(val)}
                // _setError={(key, message) => {
                //   this._setError(key, message);
                // }}
                {...this.state}
              /> */}
            </div>

            <div
              className={
                "col-12 " +
                (isSelected ? "col-md-6" : "col-md-9") +
                " mt-3 mt-md-0 align-self-center"
              }
            >
              <div className="row">
                <div className="col-12">
                  <Input
                    type="text"
                    name="code"
                    onChange={this._handleFormChange}
                    placeholder="Search vote name"
                    required
                  />
                </div>
                {/* <div className="col-3 col-md-2">
                  <Button type="primary" onClick={this._handleFormSubmit}>
                    Search
                  </Button>
                </div> */}
              </div>

              <small className="text-danger">{this.state.message.code}</small>
            </div>
            <div
              className={
                "col-12 " +
                (isSelected
                  ? "col-md-5"
                  : "col-md-2 text-lg-center") +
                " mt-3 mt-md-0 align-self-center"
              }
            >
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
                  >{isSelected ? 
                    <>
                  <CloseOutlined 
                  className="align-self-center py-auto"
                  style={{ verticalAlign: "0" }}/>{" Deselect" }</>: <>
                  <CheckOutlined 
                  className="align-self-center py-auto"
                  style={{ verticalAlign: "0" }}/>{" Select"}</>}
                  </Button>
                  {isSelected && (
                    <>
                    
    <Button
    className="mr-3 text-success shadow-sm"
    data-toggle="modal"
    data-target="#GenModal" 
    onClick={()=>this.setState({showShareModal:true})}
    disabled={this.state.ShareList.length===0&& true}>
     <span>
     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 18 18">
  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
</svg> 
    {" "} Share</span>
    </Button>
                      {/* <ModalGenerateLink {...this.state} /> */}
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
                      />
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
                      "col-12"
                    }
                  >
                    <List
                    Editable={true}
                      isSelected={isSelected}
                      el={el}
                      i={i}
                      _getHasilVote={(value)=>this._getHasilVote(
                        value.name,
                        value.jumlahkandidat,
                        value.jumlahVoters,
                        value.id_vote)}
                      _getVote={(value) => this._getVote(value)}
                      handleChecked={(value) => this.handleChecked(value)}
//                       onHasilModal
// ={this.onHasilModal
//                       }
                      setState={(value)=>this.setState(value)}
                    />
                  </div>
                  {/* <div className="col-3 col-md-2 text-center">
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
                  </div> */}
                </div>
              </>
            );
          })}
        </div>
        
        <HasilModal {...this.state} 
        // onShow={showHasilModal}
        setState={()=>this.setState({showHasilModal:false})}
                          handleDeleteVoter={(value) =>
                            this.handleDeleteVoter(value)}/>
                            
      <AddModal {...this.props} />
      <EditModal setState={value=>this.setState(value)} {...this.state} />
        <ShareModal setState={(value)=>this.setState(value)}  {...this.state} />
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
