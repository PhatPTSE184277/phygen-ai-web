import "./index.scss";
import Sidebar from "../sidebarMenu";

function Dashboard({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__content">{children}</div>
    </div>
  );
}

export default Dashboard;
