import React, { useState } from "react";
import { Button, Modal } from "antd";
import api from "../../../../api";
import { setHeader } from "../../../../Helpers/Auth";
import { useHistory } from "react-router-dom";
export default function VoteModal(props){
    const history = useHistory();
  const handleVoteClick = async () => {
    const { Vote, Option } = props;
    if (props.Option == null) {
      return alert("Anda belum memilih");
    }
    api.post("sendvote", Vote[Option], setHeader()).then((res) => {
      // console.log(res)
      if (res.data === "berhasil") {
        alert("Anda berhasil vote");
        props.setState({ showVoteModal: false })
      } else {
        alert("Anda sudah vote!");
        props.setState({ showVoteModal: false })
      }
      history.push("/voting");
    });
  };
  const optionClick = async (val) => {
    props.setState({
      Option: val,
    });
  };
    return(
    <>
    <Modal
    visible={props.showVoteModal}
        style={{ top: 10 }}
        width={1000}
        zIndex={2}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        footer={[
            
            <Button type="primary" 
                  // href="#"
                  size="large"
                  onClick={()=>handleVoteClick()}
                  class="btn btn-primary" block
                  shape="round"
                  >Vote</Button>
        ]}
        
        onCancel={() => props.setState({ showVoteModal: false })}
    title={props.Vote !== null ? props.Vote[0].votename : "kosong"}
    >
        
        <div className="row">
                  <div className="col-12 justify-content-center text-center mt-2">
                    <h1>{props.Vote && props.Vote[0].votename}</h1>
                    <p>Pilih salah satu pilihan dibawah :</p>
                  </div>
                </div>

                <div className={props.Vote && "row mt-3"}>
                  {props.Vote &&
                    props.Vote.map((element, i) => {
                      return (
                        <>
                          <div class="col-12 mt-2">
                            <div class={"card mb-4 "+(props.Option === i?'ml-5':'')}>
                              <div class={"card-body shadow-sm rounded-lg p-0"} style={{border:(props.Option === i?'3px solid #096dd9':'')}}
                                  onClick={() => optionClick(i)}>
                                <div
                                  className="row m-0"
                                >
                                  <div className="col-2 justify-content-center align-self-center">
                                    <div className="text-center inputcustom">
                                      <input
                                        type="radio"
                                        className="inputradio"
                                        value={i}
                                        checked={props.Option === i}
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
                                  style={{color:(props.Option === i?'#096dd9':'')}}
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
              
    </Modal>
    </>
    )
}