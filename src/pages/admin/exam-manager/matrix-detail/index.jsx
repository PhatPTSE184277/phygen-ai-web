import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import api from "../../../../config/axios";
import ReuseTable from "../../../../components/admin/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Popconfirm } from "antd";
import CreateMatrixDetailForm from "./createMatrixDetail";
import UpdateMatrixDetailForm from "./updateMatrixDetail";
import { toast } from "react-toastify";

function MatrixDetail() {
  const [matrixDetail, setMatrixDetail] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMatrix, setEditingMatrix] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const fetchMatrixDetail = async () => {
    setLoading(true);
    try {
      const response = await api.get("matrix_details", {
        params: { search: searchTerm },
      });
      console.log(response?.data?.data);
      setMatrixDetail(response?.data?.data);
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
      setLoading(false);
    }
  };

  const filteredMatrixDetail = matrixDetail.filter((s) => {
    const keyword = searchTerm.toLowerCase();
    return (
      s.topicName?.toLowerCase().includes(keyword) ||
      s.sectionName?.toLowerCase().includes(keyword) ||
      s.id?.toString().includes(keyword)
    );
  });

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`matrix_details/${record.id}`);
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
      await api.delete(`matrix_details/${id}`);
      toast.success("Deleted successfully.");
      fetchMatrixDetail();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops! Could not delete the item.");
    }
  };
  useEffect(() => {
    fetchMatrixDetail();
  }, [searchTerm]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Section Name",
      dataIndex: "sectionName",
      key: "sectionName",
      filters: Array.isArray(matrixDetail)
        ? Array.from(new Set(matrixDetail.map((s) => s.sectionName)))
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))
        : [],
      onFilter: (value, record) => record.sectionName === value,
    },
    {
      title: "Topic Name",
      dataIndex: "topicName",
      key: "topicName",
      filters: Array.isArray(matrixDetail)
        ? Array.from(new Set(matrixDetail.map((s) => s.topicName)))
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))
        : [],
      onFilter: (value, record) => record.topicName === value,
    },
    {
      title: "Difficulty Level",
      dataIndex: "difficultyLevel",
      key: "difficultyLevel",
      filters: Array.isArray(matrixDetail)
        ? Array.from(new Set(matrixDetail.map((s) => s.difficultyLevel)))
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))
        : [],
      onFilter: (value, record) => record.difficultyLevel === value,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: Array.isArray(matrixDetail)
        ? Array.from(new Set(matrixDetail.map((s) => s.type)))
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))
        : [],
      onFilter: (value, record) => record.type === value,
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

  const data = filteredMatrixDetail.map((s) => ({
    key: s.id,
    id: s.id,
    sectionName: s?.sectionName,
    topicName: s?.topicName,
    difficultyLevel: s?.difficultyLevel,
    quantity: s?.quantity,
    type: s?.type,
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
          <CreateMatrixDetailForm
            onCreated={() => {
              fetchMatrixDetail(); // load lại danh sách
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
        <UpdateMatrixDetailForm
          initialValues={editingMatrix}
          onUpdated={() => {
            fetchMatrixDetail();
            setIsEditModalVisible(false);
          }}
        />
      </Modal>
    </AdminDashboardComponent>
  );
}

export default MatrixDetail;
