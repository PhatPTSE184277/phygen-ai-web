import AdminDashboardComponent from "../../../components/admin/dashboard";
import BarChartComponent from "../../../components/barchart";
import Rechart from "../../../components/admin/rechart";
import "./index.scss";
import PieChartComponent from "../../../components/piechart";

function AdminDashboard() {
  // const items = [
  //   {
  //     key: "1",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="https://www.antgroup.com"
  //       >
  //         1st menu item
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="https://www.aliyun.com"
  //       >
  //         2nd menu item
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="https://www.luohanacademy.com"
  //       >
  //         3rd menu item
  //       </a>
  //     ),
  //   },
  // ];
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
    </AdminDashboardComponent>
  );
}

export default AdminDashboard;
