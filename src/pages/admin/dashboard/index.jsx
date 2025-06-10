import { Dropdown } from "antd";
import AdminDashboardComponent from "../../../components/admin/dashboard";
import { CaretDownOutlined } from "@ant-design/icons";
import BarChartComponent from "../../../components/barchart";
import RatingChart from "../../../components/admin/rating-chart";
import Rechart from "../../../components/admin/rechart";
import "./index.scss";

function AdminDashboard() {
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
    <AdminDashboardComponent>
      <div>
        <div className="admin-dashboard">
          <div className="chart">
            <div className="bar-chart">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "40px",
                }}
              >
                <h2>Accounts</h2>
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
                <h2>Rating</h2>
                <Dropdown menu={{ items }} placement="bottom">
                  <button>
                    6 months
                    <CaretDownOutlined />
                  </button>
                </Dropdown>
              </div>
              <RatingChart />
            </div>
          </div>
          <div className="rechart">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "40px",
                marginTop: "20px",
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
            <Rechart />
          </div>
        </div>
      </div>
    </AdminDashboardComponent>
  );
}

export default AdminDashboard;
