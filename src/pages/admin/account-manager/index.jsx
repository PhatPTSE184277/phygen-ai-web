import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../components/admin/dashboard";
import api from "../../../config/axios";
import ReuseTable from "../../../components/admin/table";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Modal, Popconfirm, Input, Button } from "antd";
import CreateUserForm from "./createUser";
import UpdateUserForm from "./updateUser";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const AccountManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useState({
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "id",
    desc: searchParams.get("desc") === "true",
    page: parseInt(searchParams.get("page")) || 1,
    pageSize: parseInt(searchParams.get("pageSize")) || 20,
    isDeleted: searchParams.get("isDeleted") || "",
    emailVerified: searchParams.get("emailVerified") || "",
    accountType: searchParams.get("accountType") || "",
    status: searchParams.get("status") || "",
  });

  const [searchInput, setSearchInput] = useState(queryParams.search);

  const updateURLAndParams = (newParams) => {
    const updated = { ...queryParams, ...newParams };
    const urlParams = new URLSearchParams({
      search: updated.search,
      sortBy: updated.sortBy,
      desc: updated.desc,
      page: updated.page,
      pageSize: updated.pageSize,
      isDeleted: updated.isDeleted,
      emailVerified: updated.emailVerified,
      accountType: updated.accountType,
      status: updated.status,
    });
    navigate(`?${urlParams.toString()}`);
    setQueryParams(updated);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("account_admins", {
        params: {
          Search: queryParams.search,
          SortBy: queryParams.sortBy,
          Desc: queryParams.desc,
          Page: queryParams.page,
          PageSize: queryParams.pageSize,
          IsDeleted:
            queryParams.isDeleted === ""
              ? undefined
              : queryParams.isDeleted === "true",
          EmailVerified:
            queryParams.emailVerified === ""
              ? undefined
              : queryParams.emailVerified === "true",
          AccountType: queryParams.accountType || undefined,
          Status: queryParams.status || undefined,
        },
      });
      const items = res?.data?.data?.items || [];
      const total = res?.data?.data?.total || 0;
      setUsers(items);
      setTotal(total);
    } catch (e) {
      console.error("Error fetching users:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`account_admins/${id}`);
      toast.success("Deleted successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops! Could not delete the item.");
    }
  };

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`account_admins/${record.id}`);
      const data = res?.data?.data;
      const normalizedData = {
        ...data,
        emailVerified: !!data.emailVerified,
      };
      setEditingUser(normalizedData);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      toast.error("Invalid data. Cannot update.");
    }
  };
  const onViewDetailClick = async (record) => {
    try {
      const res = await api.get(`account_admins/${record.id}`);
      setViewingUser(res?.data?.data);
      setIsDetailModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch user detail:", error);
      toast.error("Failed to load user details.");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [queryParams]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Email Verified",
      dataIndex: "emailVerified",
      key: "emailVerified",
      filters: [
        { text: "Verified", value: true },
        { text: "Not Verified", value: false },
      ],
      filteredValue:
        queryParams.emailVerified === ""
          ? null
          : [queryParams.emailVerified === "true"],
      render: (value) => (value ? "Verified" : "Not Verified"),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "user", value: "user" },
        { text: "manager", value: "manager" },
      ],
      filteredValue: queryParams.accountType ? [queryParams.accountType] : null,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "active", value: "active" },
        { text: "inactive", value: "inactive" },
      ],
      filteredValue: queryParams.status ? [queryParams.status] : null,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          {/* <InfoCircleOutlined
            onClick={() => onViewDetailClick(record)}
            style={{ color: "#0f8864ff", cursor: "pointer", marginRight: 8 }}
          /> */}

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

  const data = users.map((u) => ({
    key: u.id,
    ...u,
  }));

  return (
    <AdminDashboardComponent>
      <div style={{ display: "flex", gap: 8, marginLeft: "50%" }}>
        <Input
          placeholder="Search by name/email"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onPressEnter={() =>
            updateURLAndParams({ search: searchInput, page: 1 })
          }
          style={{ width: 300 }}
        />
        <Button
          onClick={() => updateURLAndParams({ search: searchInput, page: 1 })}
          type="primary"
        >
          Search
        </Button>
      </div>

      <ReuseTable
        columns={columns}
        data={data}
        loading={loading}
        pageSize={queryParams.pageSize}
        setPageSize={(size) => updateURLAndParams({ pageSize: size })}
        currentPage={queryParams.page}
        setCurrentPage={(page) => updateURLAndParams({ page })}
        total={total}
        onChange={(pagination, filters, sorter) => {
          updateURLAndParams({
            sortBy: sorter.field || "id",
            desc: sorter.order === "descend",
            page: pagination.current,
            pageSize: pagination.pageSize,
            isDeleted: filters.isDeleted?.[0] ?? "",
            emailVerified: filters.emailVerified?.[0] ?? "",
            accountType: filters.accountType?.[0] ?? "",
            status: filters.status?.[0] ?? "",
          });
        }}
        modalContent={({ onSuccess }) => (
          <CreateUserForm
            onCreated={() => {
              fetchUsers();
              onSuccess();
            }}
          />
        )}
        onCloseModal={() => fetchUsers()}
      />

      <Modal
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <UpdateUserForm
          initialValues={editingUser}
          onUpdated={() => {
            fetchUsers();
            setIsEditModalVisible(false);
          }}
        />
      </Modal>

      <Modal
        open={isDetailModalVisible}
        title="User Details"
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
      >
        {viewingUser ? (
          <div style={{ lineHeight: 1.8 }}>
            <p>
              <strong>ID:</strong> {viewingUser.id}
            </p>
            <p>
              <strong>Username:</strong> {viewingUser.username}
            </p>

            <p>
              <strong>Email Verified:</strong>{" "}
              {viewingUser.emailVerified ? "Verified" : "Not Verified"}
            </p>
            <p>
              <strong>Role:</strong> {viewingUser.role}
            </p>
            <p>
              <strong>Status:</strong> {viewingUser.status}
            </p>
            <p>
              <strong>Created At:</strong> {viewingUser.createdAt}
            </p>
            <p>
              <strong>Updated At:</strong> {viewingUser.updatedAt}
            </p>
            {/* Thêm các field khác nếu cần */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </AdminDashboardComponent>
  );
};

export default AccountManager;
