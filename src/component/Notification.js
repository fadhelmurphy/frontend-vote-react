import React from 'react'

export default function Notification(hasil,pesan){
    try {
        return(

            <div class="modal fade notification"
            tabindex="-1"
            role="dialog"
            aria-labelledby="my-modal"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Notification
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
              <div className="modal-body">
              {hasil?
                <h2 className="text-center text-success">Successfully {pesan}!</h2>
                :
                <h2 className="text-center text-danger">Failed {pesan}!</h2>
              }
              </div>
              </div>
            </div>
          </div>
        )
    } catch (error) {
        return(
            <div class="modal fade notification"
            tabindex="-1"
            role="dialog"
            aria-labelledby="my-modal"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Notification
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
              <div className="modal-body">
              <h2 className="text-center text-danger">Failed {pesan}!</h2>
              <h2 className="text-center text-danger">Failed {error}!</h2>
              </div>
              </div>
            </div>
          </div>
        )
    }
}