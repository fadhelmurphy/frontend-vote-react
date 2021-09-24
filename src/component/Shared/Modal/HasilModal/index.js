// import { Button } from 'antd'
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Tabs,Table, Tag, Space } from "antd";
import { Modal } from 'antd';
import { DeleteButton } from "../../Button"; 
import { GetRootContext } from "../../../../Context/Context";
export default function Hasil({ShowResultModal,handleDeleteVoter,setState}) {
  const {DetailVote} = GetRootContext().state.vote

  const {dispatch} = GetRootContext()

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
      handleDeleteVoter(
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
var candidate_name = []
DetailVote && DetailVote.candidates.forEach(({name}) => {
  coloR.push(dynamicColors());
  candidate_name.push(name)
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
        visible={ShowResultModal}
        
        style={{ top: 10 }}
        width={1000}
        zIndex={2}
 okButtonProps={{
          style: {
            display: "none",
          },
        }}
        onCancel={()=>setState({
          ShowResultModal:!ShowResultModal
        })}
        // okText="Ya"
        cancelText="Close"
      >
              <Tabs defaultActiveKey="1">
                <TabPane tab="Chart" key="1">
                  {DetailVote && DetailVote.voters_count > 0 ? (
                    <>
                      <Bar
                        data={{
                          labels: candidate_name,
                          datasets: [
                            {
                              label: DetailVote.title,
                              backgroundColor: coloR,
                              // borderColor: 'rgb(255, 99, 132)',
                              data: DetailVote.candidates.length,
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
                {DetailVote && DetailVote.voters_count > 0 ? (
                <Table columns={columns} dataSource={DetailVote.voters}
                
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}><h6>Jumlah Voters</h6></Table.Summary.Cell>
            <Table.Summary.Cell index={1}><h6>{DetailVote.voters_count}</h6></Table.Summary.Cell>
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
    </>
  );
}
