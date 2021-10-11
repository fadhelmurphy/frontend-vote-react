import { Button } from "antd";
import React, { Component } from "react";
import api from "../../../api";
import { List } from "../../Shared";
import './VotingId.css'
import { VoteModal } from "../../Shared/Modal";
import { setHeader } from "../../../Helpers/httpheader";
import { RootContext } from "../../../Context/Context";
export default class VotingId extends Component {
  constructor(props){
    super(props)
    this.state = {
      Vote: null,
      Option: null,
      ShowEditModal:false,
    };
  }
  render() {
    const { UrlLink } = this.context.state.link;
    return (
      <>
        {UrlLink != null &&
          UrlLink.vote_link.map((el, i) => (
            <div className="row mb-3">
              <div className="col-12">
              {el.canvote?
                <List
                {...this.state}
                  isSelected={false}
                  el={el}
                  i={i}
                      setState={(value)=>this.setState(value)}
                />
                :
                <div class={"list-group-item w-100 py-2 d-flex text-wrap bg-light"}>
                <span class="mr-2 w-100 align-self-center py-2 ">
                <p className="m-0">{"You have voted on "}<span style={{color:'rgb(64, 169, 255)'}}>{el.title}</span>
                {" with option : "}<span style={{color:'rgb(54, 207, 201)'}}>{el.urvote && el.urvote.option}</span></p>
                
            </span>
                </div>}
              </div>
            </div>
          ))}
          <VoteModal {...this.props} {...this.state} setState={val=>this.setState(val)} />
      </>
    );
  }
}
VotingId.contextType = RootContext
