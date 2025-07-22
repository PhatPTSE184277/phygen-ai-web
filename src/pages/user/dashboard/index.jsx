import React from "react";
import Dashboard from "../../../components/dashboard";
import BarChartComponent from "../../../components/barchart";
import { Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./index.scss";
import PieChartComponent from "../../../components/piechart";
import Rechart from "../../../components/admin/rechart";

function UserDashboard() {
  return (
    <Dashboard>
      <div>
        <div className="admin-dashboard">
          <div className="chart">
            <div className="bar-chart">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <h2>Exams Created</h2>
                {/* <Dropdown menu={{ items }} placement="bottom"> */}
                <button>6 months</button>
                {/* </Dropdown> */}
              </div>
              <BarChartComponent />
            </div>

            <div className="sebar-chart">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0px",
                }}
              >
                <h2>User Type</h2>
                {/* <Dropdown menu={{ items }} placement="bottom"> */}
                <button>6 months</button>
                {/* </Dropdown> */}
              </div>
              <PieChartComponent />
            </div>
          </div>
          <div className="rechart">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "40px 45px",
              }}
            >
              <h2>Revenue</h2>
              {/* <Dropdown menu={{ items }} placement="bottom"> */}
              <button>6 months</button>
              {/* </Dropdown> */}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Rechart />
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default UserDashboard;
