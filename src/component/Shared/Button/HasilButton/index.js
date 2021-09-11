import { Button } from 'antd'
import React from 'react'
import { Doughnut } from "react-chartjs-2";
export default function Hasil(props){
    return(<>
    
    <Button
                        className="text-success border-success"
                        class="btn btn-primary h-100"
                        data-toggle="modal"
                        data-target=".hasilvote"
                      >
                        Hasil
                      </Button>
                      
        <div
          class="modal fade hasilvote"
          tabindex="-1"
          role="dialog"
          aria-labelledby="my-modal"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {props.jumlahkandidat.title}
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
                {props.jumlahkandidat.kandidat.length > 0 ? (
                  <>
                    <Doughnut
                      data={{
                        labels: props.jumlahkandidat.kandidat,
                        datasets: [
                          {
                            label: props.jumlahkandidat.title,
                            backgroundColor: [
                              "rgba(255, 99, 132, 0.6)",
                              "rgba(54, 162, 235, 0.6)",
                              "rgba(255, 206, 86, 0.6)",
                              "rgba(75, 192, 192, 0.6)",
                              "rgba(153, 102, 255, 0.6)",
                            ],
                            // borderColor: 'rgb(255, 99, 132)',
                            data: props.jumlahkandidat.jumlah,
                          },
                        ],
                      }}
                    />
                    <table class="table table-bordered mt-5 text-center">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Email</th>
                          <th scope="col">Pilihan</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.jumlahVoters != null &&
                          props.jumlahVoters.map((voter, i) => (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{voter.email}</td>
                              <td scope="row">{voter.pilih}</td>
                              <td>
                                <button
                                  type="button"
                                  class="btn btn-small btn-danger"
                                  onClick={props.handleDeleteVoter(
                                    voter.email
                                  )}
                                >
                                  <span aria-hidden="true">Hapus</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        {props.jumlahVoters != null && (
                          <tr class="table-active">
                            <td colspan="2">Jumlah voter</td>
                            <td colspan="2">
                              {props.jumlahVoters.length}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <h3 className="text-center m-5 text-uppercase">
                    Belum ada yang vote
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
        
    </>)
}