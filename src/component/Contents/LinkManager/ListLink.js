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
import { LinkModal } from "../../Shared/Modal";
import { useHistory } from "react-router-dom";
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
      showEditModal:false,
    };
  }


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
                    {...this.state}
                    LinkPage={true}
                    Editable={true}
                      isSelected={isSelected}
                      el={el}
                      i={i}
                      _getVote={(value) => this._getVote(value)}
                      handleChecked={(value) => this.handleChecked(value)}
                      setState={val=>this.setState(val)}
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
      <LinkModal {...this.state} setState={(val)=>this.setState(val)}/>
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
