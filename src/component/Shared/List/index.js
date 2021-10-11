import React from "react";
import {
  EditOutlined,
  TeamOutlined,
  FundOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
import { GetRootContext } from "../../../Context/Context";
// import { _getVote } from "../../../Helpers/UserFunctions";
export default function List({
  el,
  i,
  handleChecked,
  Editable,
  LinkPage,
  setState,
  IsSelected,
  ShowEditModal,
  ShowResultModal
}) {
  const RootContext = GetRootContext();
  const { dispatch, _getVote, _getLink } = RootContext;
  return (
    <>
      <div class="list-group shadow-sm">
        <div
          class={"list-group-item w-100 py-2 d-flex text-wrap"}
          style={{ cursor: !Editable && "pointer" }}

          onClick={() => {
            !IsSelected? !LinkPage? _getVote(el.id):_getLink(el.id) : handleChecked(i) 
            // !IsSelected && LinkPage ? _getLink(el.id) : handleChecked(i);
            !Editable &&
            setState({
              ShowEditModal: !ShowEditModal
            });
          }}
        >
          {IsSelected && (
            <input
              className="mr-3 align-self-center"
              onClick={() => handleChecked(i)}
              checked={el.isChecked}
              type="checkbox"
            />
          )}
          <span
            className={
              "mr-2 w-100 align-self-center py-2 " +
              (LinkPage ? "text-truncate" : "")
            }
          >
            <h5 className="m-0">{LinkPage ? el.key : el.title}</h5>
            {!LinkPage ? (
              <>
                <span>
                  <p className="m-0 text-secondary">
                    <TeamOutlined
                      className="align-self-center py-auto"
                      style={{ verticalAlign: "0", color: "#40a9ff" }}
                    />{" "}
                    <span className="mr-1">{el.voters_count + " voters"}</span>{" "}
                    <AppstoreOutlined
                      className="align-self-center py-auto"
                      style={{ verticalAlign: "0", color: "#36cfc9" }}
                    />{" "}
                    {el.candidates_count + " Options"}
                  </p>
                </span>
              </>
            ) : (
              ""
            )}
          </span>
          {Editable && !IsSelected ? (
            <>
              <span
                className={
                  "align-self-center text-secondary d-flex " +
                  (!LinkPage ? "mr-3" : "")
                }
                // data-toggle={!IsSelected && "modal"}
                // data-target={!IsSelected && "#my-modal"}

                onClick={() => {
                  setState({
                    ShowEditModal: !ShowEditModal
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <EditOutlined
                  className="align-self-center py-auto mr-2"
                  style={{ verticalAlign: "0" }}
                />
                Edit
              </span>
            </>
          ) : (
            ""
          )}
          {Editable && !LinkPage && !IsSelected ? (
            <>
              <span
                className="align-self-center text-secondary d-flex"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setState({
                    ShowResultModal: !ShowResultModal
                  });
                }}
              >
                <FundOutlined
                  className="align-self-center py-auto text-success mr-2"
                  style={{ verticalAlign: "0" }}
                />
                Results
              </span>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
