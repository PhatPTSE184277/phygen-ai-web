import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import api from "../../../../config/axios";
import ReuseTable from "../../../../components/admin/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Popconfirm } from "antd";
import CreateMatrixSectionForm from "./createMatrixSection";
import UpdateMatrixSectionForm from "./updateMatrixSection";
import { toast } from "react-toastify";

function MatrixSection() {
  const [matrixDetail, setMatrixDetail] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMatrix, setEditingMatrix] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const fetchMatrixSection = async () => {
    setLoading(true);
    try {
      const response = await api.get("matrix_sections", {
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

  const filteredMatrixSection = matrixDetail.filter((s) => {
    const keyword = searchTerm.toLowerCase();
    return (
      s.sectionName?.toLowerCase().includes(keyword) ||
      s.matrixId?.toString().includes(keyword) ||
      s.id?.toString().includes(keyword)
    );
  });

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`matrix_sections/${record.id}`);
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
      await api.patch(`matrix_sections/${id}`);
      toast.success("Deleted successfully.");
      fetchMatrixSection();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops! Could not delete the item.");
    }
  };
  useEffect(() => {
    fetchMatrixSection();
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
      title: "ExamMatrix ID",
      dataIndex: "matrixId",
      key: "matrixId",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Display Order",
      dataIndex: "displayOrder",
      key: "displayOrder",
      sorter: (a, b) => a.id - b.id,
      filters: Array.isArray(matrixDetail)
        ? Array.from(new Set(matrixDetail.map((s) => s.displayOrder)))
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))
        : [],
      onFilter: (value, record) => record.displayOrder === value,
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

  const data = filteredMatrixSection.map((s) => ({
    key: s.id,
    id: s.id,
    matrixId: s?.matrixId,
    sectionName: s?.sectionName,
    displayOrder: s?.displayOrder,
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
          <CreateMatrixSectionForm
            onCreated={() => {
              fetchMatrixSection(); // load lại danh sách
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
        <UpdateMatrixSectionForm
          initialValues={editingMatrix}
          onUpdated={() => {
            fetchMatrixSection();
            setIsEditModalVisible(false);
          }}
        />
      </Modal>
    </AdminDashboardComponent>
  );
}

export default MatrixSection;
