import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import api from "../../../../config/axios";
import ReuseTable from "../../../../components/admin/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Popconfirm, Input, Button } from "antd";
import CreateMatrixSectionForm from "./createMatrixSection";
import UpdateMatrixSectionForm from "./updateMatrixSection";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

function MatrixSection() {
  const [matrixSections, setMatrixSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [editingMatrix, setEditingMatrix] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useState({
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "id",
    desc: searchParams.get("desc") === "true",
    page: parseInt(searchParams.get("page")) || 1,
    pageSize: parseInt(searchParams.get("pageSize")) || 20,
    isDeleted: searchParams.get("isDeleted") || "",
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
    });
    navigate(`?${urlParams.toString()}`);
    setQueryParams(updated);
  };

  const fetchMatrixSection = async () => {
    setLoading(true);
    try {
      const res = await api.get("matrix_sections?IsDeleted=false", {
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
        },
      });

      const items = res?.data?.data?.items || [];
      const total = res?.data?.data?.total || 0;

      setMatrixSections(items);
      setTotal(total);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  };

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`matrix_sections/${record.id}`);
      setEditingMatrix(res?.data?.data);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch details:", error);
      toast.error("Invalid data. Cannot update.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.patch(`matrix_sections/${id}`, { isDeleted: true });
      toast.success("Deleted successfully.");
      fetchMatrixSection();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops! Could not delete the item.");
    }
  };

  useEffect(() => {
    fetchMatrixSection();
  }, [queryParams]);

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
      title: "Exam Matrix ID",
      dataIndex: "matrixId",
      key: "matrixId",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Display Order",
      dataIndex: "displayOrder",
      key: "displayOrder",
      sorter: true,
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

  const data = matrixSections.map((s) => ({
    key: s.id,
    ...s,
  }));

  return (
    <AdminDashboardComponent>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <Input
          placeholder="Search by Section Name"
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
            isDeleted: filters.isDeleted?.[0] ?? "",
          });
        }}
        modalContent={({ onSuccess }) => (
          <CreateMatrixSectionForm
            onCreated={() => {
              fetchMatrixSection();
              onSuccess();
            }}
          />
        )}
        onCloseModal={() => fetchMatrixSection()}
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
