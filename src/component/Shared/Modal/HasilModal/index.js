// import { Button } from 'antd'
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Tabs, Table, Tag, Space } from "antd";
import { Modal } from "antd";
import { DeleteButton } from "../../Button";
import { GetRootContext } from "../../../../Context/Context";
export default function Hasil({ ShowResultModal, setState }) {
  const { DetailVote } = GetRootContext().state.vote;

  const { dispatch, _postDeleteVoter, _getList } = GetRootContext();

  const { TabPane } = Tabs;
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Pilihan",
      dataIndex: "pilih",
      key: "pilih"
    },
    {
      title: "Action",
      key: "action",
      render: (text) => (
        <DeleteButton
          Data={text}
          DeleteFunc={(val) =>
            _postDeleteVoter(val).then(() => {
              setState({
                ShowResultModal: !ShowResultModal
              });
            })
          }
          size="large"
        />
      )
    }
  ];
  var coloR = [];

  var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };
  var candidate_name = [];
  var candidate_length = [];
  DetailVote &&
    DetailVote.candidates.forEach(({ name, voters }) => {
      coloR.push(dynamicColors());
      candidate_name.push(name);
      voters && candidate_length.push(voters.length);
    });
  return (
    <>

      <Modal
        title="Result"
        visible={ShowResultModal}
        style={{ top: 10 }}
        width={1000}
        zIndex={2}
        okButtonProps={{
          style: {
            display: "none"
          }
        }}
        onCancel={() => {
          setState({
            ShowResultModal: !ShowResultModal
          });
          _getList();
        }}
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
                        data: candidate_length
                      }
                    ],

                    options: {
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }
                  }}
                />
              </>
            ) : (
              <h5 className="text-center m-5 text-muted">
                Belum ada yang vote
              </h5>
            )}
          </TabPane>
          <TabPane tab="Detail" key="2">
            {DetailVote && DetailVote.voters_count > 0 ? (
              <Table
                columns={columns}
                dataSource={DetailVote && DetailVote.voters}
                summary={() => (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>
                        <h6>Jumlah Voters</h6>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <h6>{DetailVote.voters_count}</h6>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
              />
            ) : (
              <h5 className="text-center m-5 text-muted">
                Belum ada yang vote
              </h5>
            )}
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
}
