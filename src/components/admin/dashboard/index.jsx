import "./index.scss";
import AdminSidebar from "../sidebar-admin";

function AdminDashboardComponent({ children }) {
  return (
    <div className="dashboard">
      <AdminSidebar />
      <div className="dashboard__content">{children}</div>
    </div>
  );
}

export default AdminDashboardComponent;
