import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import api from "../../../../config/axios";
import ReuseTable from "../../../../components/admin/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Popconfirm, Input, Button } from "antd";
import CreateMatrixDetailForm from "./createMatrixDetail";
import UpdateMatrixDetailForm from "./updateMatrixDetail";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

function MatrixDetail() {
  const [matrixDetail, setMatrixDetail] = useState([]);
  const [loading, setLoading] = useState(false);
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
    difficultyLevel: searchParams.get("difficultyLevel") || "",
    type: searchParams.get("type") || "",
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
      difficultyLevel: updated.difficultyLevel,
      type: updated.type,
    });
    navigate(`?${urlParams.toString()}`);
    setQueryParams(updated);
  };

  const fetchMatrixDetail = async () => {
    setLoading(true);
    try {
      const response = await api.get("matrix_details", {
        params: {
          Search: queryParams.search,
          SortBy: queryParams.sortBy,
          Desc: queryParams.desc,
          Page: queryParams.page,
          PageSize: queryParams.pageSize,
          DifficultyLevel: queryParams.difficultyLevel || undefined,
          Type: queryParams.type || undefined,
        },
      });
      console.log(response?.data?.data);
      const result = response?.data?.data?.items || [];
      const totalCount = response?.data?.data?.total || 0;
      setMatrixDetail(result);
      setTotal(totalCount);
    } catch (e) {
      console.error("Error fetching matrix details:", e);
      setMatrixDetail([]);
    } finally {
      setLoading(false);
    }
  };

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`matrix_details/${record.id}`);
      const data = res?.data?.data;
      setEditingMatrix(data);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch matrix detail:", error);
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
    },
    {
      title: "Topic Name",
      dataIndex: "topicName",
      key: "topicName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: true,
    },
    {
      title: "Difficulty",
      dataIndex: "difficultyLevel",
      key: "difficultyLevel",
      filters: [
        { text: "Easy", value: "easy" },
        { text: "Medium", value: "medium" },
        { text: "Hard", value: "hard" },
      ],
      filteredValue: queryParams.difficultyLevel
        ? [queryParams.difficultyLevel]
        : null,
      onFilter: false,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Multiple Choice", value: "multiple_choice" },
        { text: "Essay Question", value: "essay_question" },
      ],
      filteredValue: queryParams.type ? [queryParams.type] : null,
      onFilter: false,
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

  const data = matrixDetail.map((item) => ({
    key: item.id,
    ...item,
  }));

  useEffect(() => {
    fetchMatrixDetail();
  }, [queryParams]);

  return (
    <AdminDashboardComponent>
      <div style={{ display: "flex", gap: 8, marginLeft: "50%" }}>
        <Input
          placeholder="Search by Section Name or Topic Name"
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
        total={total}
        onChange={(pagination, filters, sorter) => {
          updateURLAndParams({
            sortBy: sorter.field || "id",
            desc: sorter.order === "descend",
            page: pagination.current,
            pageSize: pagination.pageSize,
            difficultyLevel: filters.difficultyLevel?.[0] || "",
            type: filters.type?.[0] || "",
          });
        }}
        modalContent={({ onSuccess }) => (
          <CreateMatrixDetailForm
            onCreated={() => {
              fetchMatrixDetail();
              onSuccess();
            }}
          />
        )}
        onCloseModal={() => fetchMatrixDetail()}
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
