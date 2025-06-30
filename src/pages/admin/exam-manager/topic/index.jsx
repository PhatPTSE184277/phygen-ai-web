import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import api from "../../../../config/axios";
import ReuseTable from "../../../../components/admin/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, Modal, Popconfirm } from "antd";
import CreateTopicForm from "./createTopic";
import UpdateTopicForm from "./updateTopic";

function Topic() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMatrix, setEditingMatrix] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const fetchTopic = async () => {
    setLoading(true);
    try {
      const response = await api.get("topics", {
        params: { search: searchTerm },
      });
      console.log(response?.data?.data);
      setTopics(response?.data?.data);
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
    }
  };

  const filteredSubjects = topics.filter((s) => {
    const keyword = searchTerm.toLowerCase();
    return (
      s.name?.toLowerCase().includes(keyword) ||
      s.id?.toString().includes(keyword)
    );
  });

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`topics/${record.id}`);
      const data = res?.data?.data;
      console.log(data);
      setEditingMatrix(data);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      message.error("Cannot fetch matrix details");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.patch(`topics/${id}`);
      message.success("Deleted successfully");
      fetchTopic();
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Delete failed");
    }
  };
  useEffect(() => {
    fetchTopic();
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
      filters: Array.isArray(topics)
        ? Array.from(new Set(topics.map((s) => s.name)))
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))
        : [],
      onFilter: (value, record) => record.name === value,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      filters: Array.isArray(topics)
        ? Array.from(new Set(topics.map((s) => s.level)))
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))
        : [],
      onFilter: (value, record) => record.level === value,
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subjectName",
      filters: Array.isArray(topics)
        ? Array.from(new Set(topics.map((s) => s.subjectName)))
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))
        : [],
      onFilter: (value, record) => record.subjectName === value,
    },
    {
      title: "Parent Id",
      dataIndex: "parentId",
      key: "parentId",
      sorter: (a, b) => a.parentId - b.parentId,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => (record.status ?? "") === value,
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <EditOutlined
            onClick={() => onEditClick(record)}
            style={{ color: "#633fea", cursor: "pointer", marginRight: 15 }}
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

  const data = filteredSubjects.map((s) => ({
    key: s.id,
    id: s.id,
    name: s?.name,
    level: s?.level,
    subjectName: s?.subjectName,
    parentId: s?.parentId,
    status: s?.isDeleted ? "Inactive" : "Active",
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
          <CreateTopicForm
            onCreated={() => {
              fetchTopic(); // load lại danh sách
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
        <UpdateTopicForm
          initialValues={editingMatrix}
          onUpdated={() => {
            fetchTopic();
            setIsEditModalVisible(false);
          }}
        />
      </Modal>
    </AdminDashboardComponent>
  );
}

export default Topic;
