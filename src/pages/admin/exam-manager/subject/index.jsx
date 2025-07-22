import React, { useEffect, useState } from "react";
import AdminDashboardComponent from "../../../../components/admin/dashboard";
import api from "../../../../config/axios";
import ReuseTable from "../../../../components/admin/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Popconfirm, Input, Button } from "antd";
import CreateSubjectForm from "./createSubject";
import UpdateSubjectForm from "./updateSubject";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [editingSubject, setEditingSubject] = useState(null);
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
    grade: searchParams.get("grade") || "",
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
      grade: updated.grade,
    });
    navigate(`?${urlParams.toString()}`);
    setQueryParams(updated);
  };

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("subjects?IsDeleted=false", {
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
          Grade: queryParams.grade || undefined,
        },
      });
      setSubjects(res?.data?.data?.items || []);
      setTotal(res?.data?.data?.total || 0);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  };

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`subjects/${record.id}`);
      setEditingSubject(res?.data?.data);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch subject details:", error);
      toast.error("Invalid data. Cannot update.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.patch(`subjects/${id}`, { isDeleted: true });
      toast.success("Deleted successfully.");
      fetchSubjects();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops! Could not delete the item.");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [queryParams]);

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
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      filters: [
        { text: "grade10", value: "grade10" },
        { text: "grade11", value: "grade11" },
        { text: "grade12", value: "grade12" },
      ],
      filteredValue: queryParams.grade ? [queryParams.grade] : null,
      onFilter: (value, record) => record.grade === value,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            title="Are you sure to delete this subject?"
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

  const data = subjects.map((item) => ({
    key: item.id,
    ...item,
  }));

  return (
    <AdminDashboardComponent>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <Input
          placeholder="Search by Name or Description"
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
            isDeleted:
              filters.status?.[0] === "Inactive"
                ? "true"
                : filters.status?.[0] === "Active"
                ? "false"
                : "",
            grade: filters.grade?.[0] || "",
          });
        }}
        modalContent={({ onSuccess }) => (
          <CreateSubjectForm
            onCreated={() => {
              fetchSubjects();
              onSuccess();
            }}
          />
        )}
        onCloseModal={() => fetchSubjects()}
      />

      <Modal
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <UpdateSubjectForm
          initialValues={editingSubject}
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
