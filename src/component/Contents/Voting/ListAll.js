import React, { Component } from "react";
import { ModalGenerateLink } from "./index";
import {
  logout,
  getUser,
  showPriv8,
  DeleteOneVote,
  UpdateOneVote,
  deleteVoter,
  // bulkDelete,
  setHeader,
  // _getList,
  _getVote
} from "../../../Helpers/UserFunctions";
import api from "../../../api";
// import { connect } from "react-redux";
// import { removeContact } from "../../../redux/actions";
// import { Sugar } from 'react-preloaders';
// import { setHeader } from "../../../Helpers/Auth";
import { Upload, Button, Input } from "antd";
import {
  UploadOutlined,
  CheckOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { DeleteButton } from "../../Shared/Button";
import {
  HasilModal,
  AddModal,
  EditModal,
  ShareModal
} from "../../Shared/Modal";
import { List } from "../../Shared";
import { RootContext } from "../../../Context/Context";


class ListAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShareList: [],
      LinkList: [],
      ShowEditModal:false,
      ShowResultModal:false,
      ShowShareModal:false,
      form: {
      },
      IsSelected:false
    };
    // this.handleDeleteVoter = this.handleDeleteVoter.bind(this);
  }

  // handleDeleteVoter = (email) => {
  //   const { id_vote } = this.state.jumlahkandidat;
  //   deleteVoter({ email, id_vote });
  // };

  handleChecked = async (index) => {
    const { AllVote } = this.context.state.vote;
    console.log(this.context)
    const { dispatch } = this.context;
    // var datachecked = this.state.AllVote;
    AllVote[index].isChecked = await !AllVote[index].isChecked;
    var sharelist = await AllVote.filter((el) => el.isChecked && el);
    dispatch({
      type:'GET_ALL_VOTES_SUCCESS',
      payload:AllVote
    })
    this.setState({
      ShareList: sharelist
    });
  };

  _handleFormChange = (event) => {
    let formData = this.state.form;
    formData[event.target.name] = event.target.value;
    const { AllVote } = this.context.state.vote;
    let LinkList = AllVote;
    const match = (s) => {
      const p = Array.from(s).reduce(
        (a, v, i) => `${a}[^${s.toLowerCase().substr(i)}]*?${v}`,
        ""
      );
      const re = RegExp(p);

      return LinkList.filter(({ title }) => title.toLowerCase().match(re));
    };
    LinkList = match(event.target.value);
    this.setState({
      form: formData,
      LinkList: formData[event.target.name].length > 0 ? LinkList : []
    });
  };

  componentDidMount() {
    const {_getList} = this.context
    _getList();
    // _getList(this.context);
    // this._getList();
    // this._getUser();
  }
  render() {
    const {  AllVote } = this.context.state.vote;
    const { dispatch,_getBulkDelete } = this.context;
    const { IsSelected,LinkList,ShowAddModal,ShowShareModal } =
      this.state;
    return (
      <>
        {/* <Sugar background="#1e2125" color="#0f4c75" time={1000} /> */}

        <div className="col">
          <div className="row mb-3">
            <div className="d-none d-md-block col-12 col-md-1 align-self-center">
              <Button
                type="primary"
                onClick={() =>
                  this.props.setState({ShowAddModal:!ShowAddModal})
                }
              >
                +
              </Button>
            </div>

            <div
              className={
                "col-12 " +
                (IsSelected ? "col-md-6" : "col-md-9") +
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
              </div>
            </div>
            <div
              className={
                "col-12 " +
                (IsSelected ? "col-md-5" : "col-md-2 text-lg-center") +
                " mt-3 mt-md-0 align-self-center"
              }
            >
              <Button
                className={
                  "ant-btn shadow-sm " +
                  (IsSelected ? "mr-3" : " text-primary border-primary")
                }
                onClick={async () => {
                  IsSelected &&
                    AllVote.map((el) => {
                      el.isChecked = false;
                    });
                  await this.setState({
                    ShareList: [],
                    IsSelected: !IsSelected
                  })
                  ;
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
              {IsSelected && (
                <>
                  <Button
                    className="mr-3 text-success shadow-sm"
                    onClick={() =>
                  this.setState({ShowShareModal:!ShowShareModal})
                    }
                    disabled={this.state.ShareList.length === 0 && true}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        class="bi bi-share-fill"
                        viewBox="0 0 18 18"
                      >
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                      </svg>{" "}
                      Share
                    </span>
                  </Button>
                  {/* <ModalGenerateLink {...this.state} /> */}
                  <DeleteButton
                    Data={AllVote.filter((el) => el.isChecked && el)}
                    DeleteFunc={(value) =>
                      _getBulkDelete(value)
                    }
                    size="default"
                  />
                </>
              )}
            </div>
          </div>

          {(LinkList.length > 0 ? LinkList : AllVote).map((el, i) => {
            return (
              <>
                <div className="row mb-3">
                  <div className={"col-12"}>
                    <List
                    {...this.state}
                      Editable={true}
                      el={el}
                      i={i}
                      handleChecked={(value) => this.handleChecked(value)}
                      //                       onHasilModal
                      // ={this.onHasilModal
                      //                       }
                      setState={(value) => this.setState(value)}
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

        <HasilModal
          {...this.state}
          setState={value=>this.setState(value)}
          // handleDeleteVoter={(value) => this.handleDeleteVoter(value)}
        />

        <AddModal {...this.props} setState={value=>this.props.setState(value)} />
        <EditModal {...this.state} setState={(value) => this.setState(value)} />
        <ShareModal {...this.state} setState={(value) => this.setState(value) }/>
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
