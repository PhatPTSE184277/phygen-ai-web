import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import api from "../../../../config/axios";
import ReuseTable from "../../../../components/admin/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Popconfirm } from "antd";
import CreateSubjectForm from "./createSubject";
import UpdateSubjectForm from "./updateSubject";
import { toast } from "react-toastify";

function Subject() {
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMatrix, setEditingMatrix] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await api.get("subjects", {
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
      s.name?.toLowerCase().includes(keyword) ||
      s.id?.toString().includes(keyword)
    );
  });

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`subjects/${record.id}`);
      const data = res?.data?.data;
      console.log(data);
      setEditingMatrix(data);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      toast.error("Invalid data. Cannot update.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.patch(`subjects/${id}`);
      toast.success("Deleted successfully.");
      fetchSubjects();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops! Could not delete the item.");
    }
  };
  useEffect(() => {
    fetchSubjects();
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
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      filters: Array.isArray(subject)
        ? Array.from(new Set(subject.map((s) => s.grade)))
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))
        : [],
      onFilter: (value, record) => record.grade === value,
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
    grade: s?.grade,
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
          <CreateSubjectForm
            onCreated={() => {
              fetchSubjects(); // load lại danh sách
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
        <UpdateSubjectForm
          initialValues={editingMatrix}
          onUpdated={() => {
            fetchSubjects();
            setIsEditModalVisible(false);
          }}
        />
      </Modal>
    </AdminDashboardComponent>
  );
}

export default Subject;
