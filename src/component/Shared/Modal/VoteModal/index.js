import React, { useState } from "react";
import { Button, Modal } from "antd";
import api from "../../../../api";
// import { setHeader } from "../../../../Helpers/Auth";
import { useHistory } from "react-router-dom";
import { setHeader } from "../../../../Helpers/httpheader";
import { GetRootContext } from "../../../../Context/Context";
import { customErr } from "../../../../Helpers/CustomError";
export default function VoteModal(props) {
  const RootContext = GetRootContext();
  const { _postSendVote } = RootContext;
  const { DetailVote } = RootContext.state.vote;
  const { UrlLink } = RootContext.state.link;
  // const {ShowVoteModal} = GetRootContext().state.vote
  const history = useHistory();
  const handleVoteClick = async () => {
    const { Option } = props;
    if (props.Option == null) {
      return alert("Anda belum memilih");
    }
    console.log(UrlLink.vote_link)
    _postSendVote(Option).then(res=>{
      if (res === 200) {
        props.setState({ ShowEditModal: false });
      } else {
        props.setState({ ShowEditModal: true });
      }
    })
  };
  const optionClick = async (val) => {
    props.setState({
      Option: val
    });
  };
  return (
    <>
      <Modal
        visible={props.ShowEditModal}
        style={{ top: 10 }}
        width={1000}
        zIndex={2}
        okButtonProps={{
          style: {
            display: "none"
          }
        }}
        footer={[
          <Button
            type="primary"
            // href="#"
            size="large"
            onClick={() => handleVoteClick()}
            class="btn btn-primary"
            block
            shape="round"
          >
            Vote
          </Button>
        ]}
        onCancel={() => props.setState({ ShowEditModal: !props.ShowEditModal })}
        title={DetailVote !== null ? DetailVote.title : "loading..."}
      >
        <div className="row">
          <div className="col-12 justify-content-center text-center mt-2">
            <h1>{DetailVote && DetailVote.title}</h1>
            <p>Pilih salah satu pilihan dibawah :</p>
          </div>
        </div>

        <div className={DetailVote && "row mt-3"}>
          {DetailVote &&
            DetailVote.candidates.map((element, i) => {
              return (
                <>
                  <div class="col-12 mt-2">
                    <div
                      class={"card mb-4 " + (props.Option === element.id ? "ml-5" : "")}
                    >
                      <div
                        class={"card-body shadow-sm rounded-lg p-0"}
                        style={{
                          border: props.Option === element.id ? "3px solid #096dd9" : ""
                        }}
                        onClick={() => optionClick(element.id)}
                      >
                        <div className="row m-0">
                          <div className="col-2 justify-content-center align-self-center">
                            <div className="text-center inputcustom">
                              <input
                                type="radio"
                                className="inputradio"
                                value={element.id}
                                checked={props.Option === element.id}
                              />
                              <span class="checkmark"></span>
                            </div>
                          </div>
                          <div className="col-4 p-0">
                            <img
                              className="img-fluid w-100" style={{maxHeight:"200px",objectFit:'cover'}}
                              src={
                                element.image
                                  ? process.env.REACT_APP_BACKEND +
                                    "storage/" +
                                    element.image
                                  : "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22362%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20362%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_175c6c72523%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A18pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_175c6c72523%22%3E%3Crect%20width%3D%22362%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22134.953125%22%20y%3D%22108.1%22%3E362x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                              }
                              alt="Card image cap"
                            />
                          </div>
                          <div className="col-6 justify-content-center align-self-center">
                            <h6
                              className={"text-center font-weight-bold m-0 "}
                              style={{
                                color: props.Option === element.id ? "#096dd9" : ""
                              }}
                            >
                              {element.name.toUpperCase()}
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
      </Modal>
    </>
  );
}
