import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm } from "antd";
import api from "../../../../config/axios";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import ReuseTable from "../../../../components/admin/table";
import CreateMatrixForm from "./createMatrix";
import UpdateMatrixForm from "./updateMatrix";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const ExamMatrix = () => {
  const [matrix, setMatrix] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [editingMatrix, setEditingMatrix] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [total, setTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useState({
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "id",
    desc: searchParams.get("desc") === "true",
    page: parseInt(searchParams.get("page")) || 1,
    pageSize: parseInt(searchParams.get("pageSize")) || 20,
    subjectId: searchParams.get("subjectId") || "",
    status: searchParams.get("status") || "",
    examType: searchParams.get("examType") || "",
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
      subjectId: updated.subjectId,
      status: updated.status,
      examType: updated.examType,
    });
    navigate(`?${urlParams.toString()}`);
    setQueryParams(updated);
  };

  const fetchMatrixs = async () => {
    setLoading(true);
    try {
      const res = await api.get("exam_matrices?Status=active", {
        params: {
          Search: queryParams.search,
          SortBy: queryParams.sortBy,
          Desc: queryParams.desc,
          Page: queryParams.page,
          PageSize: queryParams.pageSize,
          SubjectId: queryParams.subjectId || undefined,
          Status: queryParams.status || undefined,
          ExamType: queryParams.examType || undefined,
        },
      });
      const items = res?.data?.data?.items;
      const total = res?.data?.data?.total;
      setMatrix(Array.isArray(items) ? items : []);
      setTotal(typeof total === "number" ? total : 0);
    } catch (error) {
      console.error("Failed to fetch matrixs:", error);
      setMatrix([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.get("subjects");
      const items = res?.data?.data?.items;
      setSubjects(items);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách môn học:", error);
    }
  };

  const getSubjectName = (id) => {
    const subject = subjects.find((s) => s.id === id);
    return subject?.name || "Unknown";
  };

  const handleDelete = async (id) => {
    try {
      await api.patch(`exam_matrices/${id}`);
      toast.success("Deleted successfully.");
      fetchMatrixs();
    } catch (e) {
      console.error("Delete error:", e);
      toast.error("Could not delete the item.");
    }
  };

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`exam_matrices/${record.id}`);
      setEditingMatrix(res?.data?.data);
      setIsEditModalVisible(true);
    } catch (e) {
      console.log(e);
      toast.error("Invalid data. Cannot update.");
    }
  };

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
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Exam type",
      dataIndex: "examtype",
      key: "examtype",
      filters: [
        { text: "Midterm 1", value: "midterm_1" },
        { text: "Midterm 2", value: "midterm_2" },
        { text: "End of term 1", value: "end_of_term_1" },
        { text: "End of term 2", value: "end_of_term_2" },
      ],
      filteredValue: queryParams.examType ? [queryParams.examType] : null,
      onFilter: (value, record) => record.examtype === value,
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
            title="Are you sure to delete this item?"
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

  const data = Array.isArray(matrix)
    ? matrix.map((m, index) => ({
        key: m.id || index,
        id: m.id,
        subjectName: getSubjectName(m.subjectId),
        createdBy: m.createdBy || "N/A",
        examtype: m.examtype || "N/A",
        status: m.status,
      }))
    : [];

  useEffect(() => {
    fetchMatrixs();
    fetchSubjects();
  }, [queryParams]);

  return (
    <AdminDashboardComponent>
      <div style={{ display: "flex", gap: 8, marginLeft: "50%" }}>
        <Input
          placeholder="Search by Subject Name or Exam type"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ width: 300 }}
          onPressEnter={() =>
            updateURLAndParams({ search: searchInput, page: 1 })
          }
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
        searchTerm={queryParams.search}
        // setSearchTerm removed to prevent auto call on typing
        modalContent={({ onSuccess }) => (
          <CreateMatrixForm
            subjects={subjects}
            onCreated={() => {
              fetchMatrixs();
              fetchSubjects();
              onSuccess();
            }}
          />
        )}
        onCloseModal={() => fetchMatrixs()}
        total={total}
        onChange={(pagination, filters, sorter) => {
          updateURLAndParams({
            sortBy: sorter.field || "id",
            desc: sorter.order === "descend",
            page: pagination.current,
            pageSize: pagination.pageSize,
            status: filters.status?.[0] || "",
            examType: filters.examtype?.[0] || "",
          });
        }}
      />

      <Modal
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <UpdateMatrixForm
          initialValues={editingMatrix}
          onUpdated={() => {
            fetchMatrixs();
            fetchSubjects();
            setIsEditModalVisible(false);
          }}
        />
      </Modal>
    </AdminDashboardComponent>
  );
};

export default ExamMatrix;
