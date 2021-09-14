import { Button } from "antd";
import React, { Component } from "react";
import api from "../../../api";
import { setHeader } from "../../../Helpers/Auth";
import { List } from "../../Shared";
import './VotingId.css'
export default class VotingId extends Component {
  state = {
    Vote: null,
    Option: null,
  };
  _getVote = async (id) => {
    const response = await api.get("get/" + id, setHeader());
    response.data.vote.map((el) => {
      el["id_vote"] = id;
      el["action"] = "ubah";
    });
    this.setState({
      Option:null,
      Vote: response.data.vote,
    });
  };
  handleVoteClick = async () => {
    const { Vote, Option } = this.state;
    if (Option == null) {
      return alert("Anda belum memilih");
    }
    api.post("sendvote", Vote[Option], setHeader()).then((res) => {
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
  optionClick = async (val) => {
    this.setState({
      Option: val,
    });
  };
  render() {
    const { LinkList } = this.props;
    const { Vote, Option } = this.state;
    return (
      <>
        {LinkList != null &&
          LinkList.map((el, i) => (
            <div className="row mb-3">
              <div className="col-12">
              {el.voterCanVote===null?
                <List
                  isSelected={false}
                  el={el}
                  i={i}
                  _getVote={(value) => this._getVote(value)}
                  handleChecked={(value) => this.handleChecked(value)}
                />:
                <div class={"list-group-item w-100 py-2 d-flex text-wrap bg-light"}>
                <span class="mr-2 w-100 align-self-center py-2 ">
                <p className="m-0">{"You have voted in "}<span style={{color:'rgb(64, 169, 255)'}}>{el.name}</span>
                {" with option : "}<span style={{color:'rgb(54, 207, 201)'}}>{el.voterCanVote}</span></p>
                
            </span>
                </div>}
                {/* <div class="list-group flex-row"
          
          onClick={() => this._getVote(el.id_vote)}>
            <a
              style={{ cursor: "pointer" }}
              class="list-group-item w-100 py-2"
              data-toggle="modal"
              data-target="#my-modal"
            >
              {el.name ? el.name : el.votename}
            </a>
          </div> */}
              </div>
            </div>
          ))}
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
              <div class="modal-body px-4">
                <div className="row">
                  <div className="col-12 justify-content-center text-center mt-2">
                    <h1>{Vote && Vote[0].votename}</h1>
                    <p>Pilih salah satu pilihan dibawah :</p>
                  </div>
                </div>

                <div className={Vote && "row mt-3"}>
                  {Vote &&
                    Vote.map((element, i) => {
                      return (
                        <>
                          <div class="col-12 mt-2">
                            <div class={"card mb-4 "+(Option === i?'ml-5':'')}>
                              <div class={"card-body shadow-sm rounded-lg p-0"} style={{border:(Option === i?'3px solid #096dd9':'')}}
                                  onClick={() => this.optionClick(i)}>
                                <div
                                  className="row m-0"
                                >
                                  <div className="col-2 justify-content-center align-self-center">
                                    <div className="text-center inputcustom">
                                      <input
                                        type="radio"
                                        className="inputradio"
                                        value={i}
                                        checked={Option === i}
                                      />
                                      <span class="checkmark"></span>
                                    </div>
                                  </div>
                                  <div className="col-4 p-0">
                                    <img
                                      className="img-fluid w-100"
                                      src={
                                        element.kandidatImage !== "kosong"
                                          ? process.env.REACT_APP_BACKEND +
                                            "storage/" +
                                            element.kandidatImage
                                          : "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22362%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20362%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_175c6c72523%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_175c6c72523%22%3E%3Crect%20width%3D%22362%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22134.953125%22%20y%3D%22108.1%22%3E362x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                      }
                                      alt="Card image cap"
                                    />
                                  </div>
                                  <div className="col-6 justify-content-center align-self-center">
                                  <h6 className={"text-center font-weight-bold m-0 "}
                                  style={{color:(Option === i?'#096dd9':'')}}
                                  >
                                      {element.kandidat.toUpperCase()}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
              <div className="modal-footer">
              <Button type="primary" 
                  // href="#"
                  size="large"
                  onClick={this.handleVoteClick}
                  class="btn btn-primary" block
                  shape="round"
                  >Vote</Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
