import React from "react";
import Dashboard from "../../../components/dashboard";
import BarChartComponent from "../../../components/barchart";
import { Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./index.scss";
import PieChartComponent from "../../../components/piechart";

function UserDashboard() {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <Dashboard>
      <div className="user-dashboard">
        <div className="chart">
          <div className="bar-chart">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "40px",
              }}
            >
              <h2>Exams</h2>
              <Dropdown menu={{ items }} placement="bottom">
                <button>
                  6 months
                  <CaretDownOutlined />
                </button>
              </Dropdown>
            </div>
            <BarChartComponent />
          </div>

          <div className="pie-chart">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2>Grade</h2>
              <Dropdown menu={{ items }} placement="bottom">
                <button>
                  6 months
                  <CaretDownOutlined />
                </button>
              </Dropdown>
            </div>
            <PieChartComponent />
          </div>
        </div>
        <div>
          <h2>Recent Exam</h2>
        </div>
      </div>
    </Dashboard>
  );
}

export default UserDashboard;
