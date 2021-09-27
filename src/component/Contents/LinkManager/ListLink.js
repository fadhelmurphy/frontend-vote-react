import React, { Component } from "react";
import {
  getUser,
  // showPriv8,
  // DeleteOneLink,
  // UpdateOneLink,
  // bulkDeleteLinks,
  setHeader
} from "../../../Helpers/UserFunctions";
import api from "../../../api";
import { imgVote } from "../../../asset";
// import { connect } from "react-redux";
// import { removeContact } from "../../../redux/actions";
// import { Sugar } from 'react-preloaders';
// import { setHeader } from "../../../Helpers/Auth";
import { Doughnut } from "react-chartjs-2";
import { Header } from "../../Shared";
import { Button, Select, Input, Form } from "antd";
import { List } from "../../Shared";
import { DeleteButton } from "../../Shared/Button";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { AddModal, LinkModal } from "../../Shared/Modal";
import { useHistory } from "react-router-dom";
import { RootContext } from "../../../Context/Context";
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
        opsi: []
      },
      form: {
        code: ""
      },
      IsSelected: false,
      Alert: ""
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
    this.setState({ DetailLink: null });
    const response = await api.get("getlink/" + id, setHeader());
    response.data.vote.map((el) => {
      // el["id_vote"] = el.id_vote;
      el["action"] = "ubah";
    });
    this.setState({
      Vote: response.data.vote
    });
  };

  _getList = async () => {
    const response = await api.get("/links", setHeader());
    this.setState({
      AllData: response.data.data,
      isLoading: false
    });
  };

  _getVoteList = async () => {
    this.setState({ Vote: null });
    const response = await api.get("votes", setHeader());
    this.setState({
      VoteList: response
    });
  };

  _getUser = async () => {
    await getUser().then((res) => {
      this.setState({
        name: res
      });
    });
  };
  handleChecked = async (index) => {
    const { dispatch } = this.context;
    const { AllLinks } = this.context.state.link;
    var datachecked = AllLinks;
    datachecked[index].isChecked = await !datachecked[index].isChecked;
    var sharelist = await datachecked.filter((el) => el.isChecked && el);
    dispatch({ type: "GET_ALL_LINKS_SUCCESS", payload: datachecked });
    this.setState({
      ShareList: sharelist
    });
  };
  // _setPublic(){
  //   this.setState({isPublic:!this.state.isPublic})
  // }
  // _setCode(id){
  //   this.setState({code:id})
  // }

  componentDidMount() {
    const { _getListLink } = this.context;
    _getListLink();
    // this._getVoteList();
    // this._getUser();
  }
  render() {
    const { AllLinks } = this.context.state.link;
    const { dispatch,_postBulkDeleteLinks } = this.context;
    const { Option } = Select;
    const { AllData, Vote, name, LinkList, VoteList, IsSelected } = this.state;
    // const {contacts,removeExistingContact} = this.props
    console.log(AllLinks);
    return (
      <>
        {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}
        <div className="col">
          <div className="row mb-3">
            <div
              className={
                "col-12 " +
                (IsSelected
                  ? "col-md-4 pr-lg-4 text-lg-left"
                  : "col-md-1 text-lg-left") +
                " mt-3 mt-md-0 align-self-center"
              }
            >
              {LinkList.length === 0 && (
                <>
                  <Button
                    className={
                      "ant-btn shadow-sm " +
                      (IsSelected ? "mr-3" : " text-primary border-primary")
                    }
                    onClick={async () => {
                      IsSelected &&
                        AllLinks.map((el) => {
                          el.isChecked = false;
                        });
                      await this.setState({
                        ShareList: [],
                        IsSelected: !IsSelected
                      });
                    }}
                  >
                    {IsSelected ? (
                      <>
                        <CloseOutlined
                          className="align-self-center py-auto"
                          style={{ verticalAlign: "0" }}
                        />
                        {" Deselect"}
                      </>
                    ) : (
                      <>
                        <CheckOutlined
                          className="align-self-center py-auto"
                          style={{ verticalAlign: "0" }}
                        />
                        {" Select"}
                      </>
                    )}
                  </Button>
                  {
                    IsSelected && (
                      // <BulkDeleteButton
                      //   bulkDelete={(value) => bulkDeleteLinks(value)}
                      //   {...this.state}
                      // >
                      //   Delete
                      // </BulkDeleteButton>

                      <DeleteButton
                        Data={AllLinks.filter((el) => el.isChecked && el)}
                        DeleteFunc={(value) => {
                          _postBulkDeleteLinks(value).then((res) => {
                            const { reload } = res;

                            if (reload) {
                              this.setState({ IsSelected: !IsSelected });
                            }
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
          {(LinkList.length > 0 ? LinkList : AllLinks).map((el, i) => {
            return (
              <>
                <div className="row mb-3">
                  <div className="col-12">
                    <List
                      {...this.state}
                      LinkPage={true}
                      Editable={true}
                      IsSelected={IsSelected}
                      el={el}
                      i={i}
                      _getVote={(value) => this._getVote(value)}
                      handleChecked={(value) => this.handleChecked(value)}
                      setState={(value) => this.setState(value)}
                    />
                    {/* <div class="list-group flex-row">
                      <a
                        // href="#"
                        style={{ cursor: "pointer" }}
                        class={"list-group-item w-100 py-2"}
                        onClick={() => {
                          !IsSelected
                            ? this._getVote(el.id_url)
                            : this.handleChecked(i);
                        }}
                        data-toggle={!IsSelected && "modal"}
                        data-target={!IsSelected && "#my-modal"}
                      >
                        {IsSelected && (
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
        <LinkModal {...this.state} setState={(val) => this.setState(val)} />
        <AddModal {...this.props} setState={value=>this.props.setState(value)} />
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
ListAll.contextType = RootContext;
export default ListAll;
