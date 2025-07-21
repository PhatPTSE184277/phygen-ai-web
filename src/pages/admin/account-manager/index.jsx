import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../components/admin/dashboard";
import api from "../../../config/axios";
import ReuseTable from "../../../components/admin/table";
import CreateUserForm from "./createUser";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Popconfirm } from "antd";
import UpdateUserForm from "./updateUser";
import { toast } from "react-toastify";

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
      const response = await api.get("account_admins", {
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
      toast.success("Deleted successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error);
      const errorMessage = error.response?.data?.error[0];
      console.error(errorMessage);
      toast.error("Oops! Could not delete the item.");
    }
  };

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`account_admins/${record.id}`);
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
      toast.error("Invalid data. Cannot update.");
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
      filters: [
        { text: "Verified", value: "Verified" },
        { text: "Not Verified", value: "Not Verified" }, // đã xóa khoảng trắng thừa
      ],
      onFilter: (value, record) =>
        (record.emailStatus ?? "").toLowerCase().trim() ===
        value.toLowerCase().trim(),
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      filters: [
        { text: "free", value: "free" },
        { text: "premium", value: "premium" },
      ],
      onFilter: (value, record) => (record.account ?? "") === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "active", value: "active" },
        { text: "inactive", value: "inactive" },
      ],
      onFilter: (value, record) => (record.status ?? "") === value,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <EditOutlined
            onClick={() => onEditClick(record)}
            style={{ color: "#633fea", cursor: "pointer", marginRight: 8 }}
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
