// import { Button } from 'antd'
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Tabs,Table, Tag, Space } from "antd";
import { Modal } from 'antd';
import { DeleteButton } from "../../Button"; 
export default function Hasil(props) {

const { TabPane } = Tabs;
const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Pilihan',
    dataIndex: 'pilih',
    key: 'pilih',
  },
  {
    title: 'Action',
    key: 'action',
    render: text => 

    <DeleteButton
    Data={text.email}
    DeleteFunc={(val) =>
      props.handleDeleteVoter(
          val
                                  )
    }
    size="large"
  />,
  },
];
var coloR = [];

var dynamicColors = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};
props.jumlahkandidat.jumlah.forEach(() => {
  coloR.push(dynamicColors());
});

  return (
    <>
      {/*     
    <Button
                        className="text-success border-success shadow-sm"
                        class="btn btn-primary h-100"
                        data-toggle="modal"
                        data-target=".hasilvote"
                        size="large">Hasil
                      </Button> */}
                      
      <Modal
      title="Result"
        visible={props.showHasilModal}
        
        style={{ top: 10 }}
        width={1000}
        zIndex={2}
 okButtonProps={{
          style: {
            display: "none",
          },
        }}
        onCancel={props.setState}
        // okText="Ya"
        cancelText="Close"
      >
              <Tabs defaultActiveKey="1">
                <TabPane tab="Chart" key="1">
                  {props.jumlahkandidat.kandidat.length > 0 ? (
                    <>
                      <Bar
                        data={{
                          labels: props.jumlahkandidat.kandidat,
                          datasets: [
                            {
                              label: props.jumlahkandidat.title,
                              backgroundColor: coloR,
                              // borderColor: 'rgb(255, 99, 132)',
                              data: props.jumlahkandidat.jumlah,
                            },
                          ],
                        }}
                      />
                    </>
                  ) : (
                    <h3 className="text-center m-5 text-uppercase">
                      Belum ada yang vote
                    </h3>
                  )}
                </TabPane>
                <TabPane tab="Detail" key="2">
                {props.jumlahkandidat.kandidat.length > 0 ? (
                <Table columns={columns} dataSource={props.jumlahVoters}
                
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}><h6>Jumlah Voters</h6></Table.Summary.Cell>
            <Table.Summary.Cell index={1}><h6>{props.jumlahVoters != null && (props.jumlahVoters.length)}</h6></Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
                />
                ): (
                    <h3 className="text-center m-5 text-uppercase">
                      Belum ada yang vote
                    </h3>
                  )}
                </TabPane>
              </Tabs>
      </Modal>

      {/* <div
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
              <Tabs defaultActiveKey="1">
                <TabPane tab="Chart" key="1">
                  {props.jumlahkandidat.kandidat.length > 0 ? (
                    <>
                      <Bar
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
                    </>
                  ) : (
                    <h3 className="text-center m-5 text-uppercase">
                      Belum ada yang vote
                    </h3>
                  )}
                </TabPane>
                <TabPane tab="Detail" key="2">
                {props.jumlahkandidat.kandidat.length > 0 ? (
                <Table columns={columns} dataSource={props.jumlahVoters}
                
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}><h6>Jumlah Voters</h6></Table.Summary.Cell>
            <Table.Summary.Cell index={1}><h6>{props.jumlahVoters != null && (props.jumlahVoters.length)}</h6></Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
                />
                ): (
                    <h3 className="text-center m-5 text-uppercase">
                      Belum ada yang vote
                    </h3>
                  )}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
