import React from "react";
import { HasilButton } from "../Button";
import { EditOutlined, TeamOutlined,FundOutlined,AppstoreOutlined } from "@ant-design/icons";
export default function List({ isSelected, el, i, _getVote,_getHasilVote, handleChecked, Editable, LinkPage }) {
  // const {LinkList,AllData} = props
  return (
    <>
      <div
        class="list-group shadow-sm"
      >
        <div class={"list-group-item w-100 py-2 d-flex text-wrap"} 
                style={{ cursor: !Editable && "pointer" }}
                        data-toggle={!Editable && "modal"}
                        data-target={!Editable && "#my-modal"}
        
        onClick={() => {
          !isSelected ? _getVote(el.id_vote) : handleChecked(i);
        }}>
          {isSelected && (
            <input
              className="mr-3 align-self-center"
              onClick={() => handleChecked(i)}
              checked={el.isChecked}
              type="checkbox"
            />
          )}
          <span
          className={"mr-2 w-100 align-self-center py-2 "+(LinkPage?"text-truncate":"")}>
            <h5 className="m-0">{el.name}</h5>
            {!LinkPage?
            <>
            <span>
              
            <p className="m-0 text-secondary">
            <TeamOutlined
                  className="align-self-center py-auto"
                  style={{ verticalAlign: "0",color:'#40a9ff' }}
                />{" "}
                <span className="mr-1">{(el.jumlahVoters && el.jumlahVoters.length>0?el.jumlahVoters.length:0)+" voters"}</span>{" "} 
            <AppstoreOutlined
                  className="align-self-center py-auto"
                  style={{ verticalAlign: "0",color:'#36cfc9'}}
                />{" "}
                {(el.jumlahOpsi && el.jumlahOpsi>0?el.jumlahOpsi:0)+" Options"}</p>
            </span>
            </>
            :''}
          </span>
          {Editable && !isSelected ?
          <>
              <span
              className={"align-self-center text-secondary d-flex "+(!LinkPage ?"mr-3":"")}
                data-toggle={!isSelected && "modal"}
                data-target={!isSelected && "#my-modal"}
                style={{ cursor: "pointer" }}
              >
                <EditOutlined
                  className="align-self-center py-auto mr-2"
                  style={{ verticalAlign: "0" }}
                />Edit
              </span>
              </>
              :''}
          {Editable && !LinkPage && !isSelected ?
          <>
              <span
              className="align-self-center text-secondary d-flex"
                data-toggle={!isSelected && "modal"}
                data-target={!isSelected && ".hasilvote"}
                style={{ cursor: "pointer" }}
                
                onClick={() =>
                          _getHasilVote(el
                          )
                        }
              >
                <FundOutlined
                  className="align-self-center py-auto text-success mr-2"
                  style={{ verticalAlign: "0" }}
                />
                Results
              </span>
              </>
              :''}
        </div>
      </div>
    </>
  );
}
