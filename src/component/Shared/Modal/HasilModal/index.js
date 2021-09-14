// import { Button } from 'antd'
import React from "react";
import { Bar } from "react-chartjs-2";
import { Tabs,Table, Tag, Space } from "antd";
import { Button } from 'antd';
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

    <Button
    className="shadow-sm"
            danger
            type="primary"
            size={"default"}
onClick={props.handleDeleteVoter(
          text.email
                                  )}>
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
</Button>,
  },
];


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
      </div>
    </>
  );
}
