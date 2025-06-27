import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../components/admin/dashboard";
import api from "../../../config/axios";
import ReuseTable from "../../../components/admin/table";
import CreateUserForm from "./createUser";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Popconfirm, message } from "antd";
import UpdateUserForm from "./updateUser";

const AccountManager = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const filteredUsers = user.filter((u) => {
    const keyword = searchTerm.toLowerCase();
    return (
      u.username?.toLowerCase().includes(keyword) ||
      u.email?.toLowerCase().includes(keyword) ||
      u.id?.toString().includes(keyword)
    );
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("AccountAdmin", {
        params: { search: searchTerm },
      });
      console.log(response?.data?.data);
      setUser(response?.data?.data);
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`AccountAdmin/${id}`);
      message.success("Deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Delete failed");
    }
  };

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`AccountAdmin/${record.id}`);
      const data = res?.data?.data;
      console.log(data);

      // Bắt buộc chuẩn hóa kiểu dữ liệu nếu cần
      const normalizedData = {
        ...data,
        emailVerified: !!data.emailVerified, // ép về true/false
      };

      setEditingUser(normalizedData); // set dữ liệu cho form
      setIsEditModalVisible(true); // mở modal
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      message.error("Không thể lấy thông tin user");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

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
      render: (text, record) => (
        <>
          <EditOutlined
            onClick={() => onEditClick(record)}
            style={{ cursor: "pointer", marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const data = filteredUsers.map((u, index) => ({
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
      <Modal
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <UpdateUserForm
          initialValues={editingUser}
          onUpdated={() => {
            fetchUsers(); // reload user list
            setIsEditModalVisible(false); // close modal
          }}
        />
      </Modal>
    </AdminDashboardComponent>
  );
};

export default AccountManager;
