import React from 'react'
import { HasilButton } from '../Button';
export default function List({isSelected,el,i,_getVote,handleChecked}){
    // const {LinkList,AllData} = props
    return(
    <>
                    <div class="list-group flex-row">
                      <a
                        // href="#"
                        style={{ cursor: "pointer" }}
                        class={"list-group-item w-100 py-2 text-truncate"}
                        onClick={() => {
                          !isSelected
                            ? _getVote(el.id_vote)
                            : handleChecked(i);
                        }}
                        data-toggle={!isSelected && "modal"}
                        data-target={!isSelected && "#my-modal"}
                      >
                        {isSelected && (
                          <input
                            className="mr-3"
                            onClick={() => handleChecked(i)}
                            checked={el.isChecked}
                            type="checkbox"
                          />
                        )}
                        {el.name}
                      </a>
                    </div>
    </>
    )
}