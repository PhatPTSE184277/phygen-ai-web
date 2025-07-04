import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Popconfirm, message } from "antd";
import api from "../../../../config/axios";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import ReuseTable from "../../../../components/admin/table";
import CreateMatrixForm from "./createMatrix";
import UpdateMatrixForm from "./updateMatrix";

const ExamMatrix = () => {
  const [matrix, setMatrix] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMatrix, setEditingMatrix] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const filteredMatrix = matrix.filter((m) => {
    const keyword = searchTerm.toLowerCase();
    return (
      m.createdBy?.toString().includes(keyword) ||
      m.id?.toString().includes(keyword)
    );
  });

  const fetchMatrixs = async () => {
    setLoading(true);
    try {
      const response = await api.get("exam_matrixs", {
        params: { search: searchTerm },
      });
      console.log(response?.data?.data);
      setMatrix(response?.data?.data);
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.get("subjects");
      console.log(res?.data);
      setSubjects(res?.data?.data);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    }
  };

  const getSubjectName = (id) => {
    if (!Array.isArray(subjects)) return "Unknown";
    const subject = subjects.find((s) => s.id === id);
    return subject?.name || "Unknown";
  };

  const handleDelete = async (id) => {
    try {
      await api.patch(`exam_matrixs/${id}`);
      message.success("Deleted successfully");
      fetchMatrixs();
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Delete failed");
    }
  };

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`exam_matrixs/${record.id}`);
      const data = res?.data?.data;
      console.log(data);
      setEditingMatrix(data);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      message.error("Cannot fetch matrix details");
    }
  };
  useEffect(() => {
    fetchMatrixs();
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
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subjectName",
      filters:
        Array.isArray(matrix) && Array.isArray(subjects)
          ? Array.from(
              new Set(
                matrix
                  .map((m) => {
                    const subject = subjects.find((s) => s.id === m.subjectId);
                    return subject?.name;
                  })
                  .filter(Boolean)
              )
            ).map((name) => ({
              text: name,
              value: name,
            }))
          : [],
      onFilter: (value, record) => record.subjectName === value,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: (a, b) => a.createdBy - b.createdBy,
    },
    {
      title: "Exam type",
      dataIndex: "examtype",
      key: "examtype",
      filters: Array.from(new Set(matrix.map((item) => item.examtype)))
        .filter(Boolean)
        .map((type) => ({
          text: type,
          value: type,
        })),
      onFilter: (value, record) => record.examtype === value,
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

  const data = filteredMatrix.map((m, index) => ({
    key: m.id || index,
    id: m.id,
    subjectName: getSubjectName(m.subjectId),
    createdBy: m.createdBy || "N/A",
    examtype: m.examtype || "N/A",
    status: m.status,
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
          <CreateMatrixForm
            subjects={subjects}
            onCreated={() => {
              fetchSubjects();
              fetchMatrixs();
              onSuccess();
            }}
          />
        )}
      />
      <Modal
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <UpdateMatrixForm
          initialValues={editingMatrix}
          onUpdated={() => {
            fetchSubjects();
            fetchMatrixs();
            setIsEditModalVisible(false);
          }}
        />
      </Modal>
    </AdminDashboardComponent>
  );
};

export default ExamMatrix;
