import React, { useState } from "react";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import api from "../../../../config/axios";

function Subject() {
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("subject", {
        params: { search: searchTerm },
      });
      console.log(response?.data?.data);
      setSubject(response?.data?.data);
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
    }
  };

  const filteredSubjects = subject.filter((s) => {
    const keyword = searchTerm.toLowerCase();
    return (
      s.username?.toLowerCase().includes(keyword) ||
      s.email?.toLowerCase().includes(keyword) ||
      s.id?.toString().includes(keyword)
    );
  });

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "EmailVerified",
      dataIndex: "emailStatus",
      key: "emailStatus",
      sorter: (a, b) => a.emailStatus.localeCompare(b.emailStatus),
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      sorter: (a, b) => a.account.localeCompare(b.account),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status  ",
      sorter: (a, b) => {
        const statusA = a.status || "";
        const statusB = b.status || "";
        return statusA.localeCompare(statusB);
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <>
          <EditOutlined
            style={{ color: "#633fea", cursor: "pointer", marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this user?"
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const data = filteredSubjects.map((u, index) => ({
    key: u.id || index,
    id: u.id,
    name: u.name || u.username || "N/A",
    email: u.email || "N/A",
    emailStatus: u.emailVerified ? "Verified" : "Not verified",
    account: u.accountType,
    status: u.status,
  }));
  return (
    <AdminDashboardComponent>
      <ReuseTable
        columns={columns}
        data={data}
        loading={loading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        modalContent={({ onSuccess }) => (
          <CreateUserForm
            onCreated={() => {
              fetchUsers(); // load lại danh sách
              onSuccess(); // đóng modal
            }}
          />
        )}
      />
    </AdminDashboardComponent>
  );
}

export default Subject;
