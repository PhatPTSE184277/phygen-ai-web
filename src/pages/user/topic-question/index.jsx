import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Modal, Popconfirm, Input, Button } from "antd";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../config/axios";
import Dashboard from "../../../components/dashboard";
import ReuseTable from "../../../components/admin/table";
import CreateTopicForm from "../../admin/exam-manager/topic/createTopic";
import UpdateTopicForm from "../../admin/exam-manager/topic/updateTopic";

function TopicManager() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [editingTopic, setEditingTopic] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useState({
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "id",
    desc: searchParams.get("desc") === "true",
    page: parseInt(searchParams.get("page")) || 1,
    pageSize: parseInt(searchParams.get("pageSize")) || 20,
    level: searchParams.get("level") || "",
    subjectName: searchParams.get("subjectName") || "",
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
      level: updated.level,
      subjectName: updated.subjectName,
      isDeleted: updated.isDeleted,
    });
    navigate(`?${urlParams.toString()}`);
    setQueryParams(updated);
  };

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await api.get("topics?IsDeleted=false", {
        params: {
          Search: queryParams.search,
          SortBy: queryParams.sortBy,
          Desc: queryParams.desc,
          Page: queryParams.page,
          PageSize: queryParams.pageSize,
          Level: queryParams.level || undefined,
          SubjectName: queryParams.subjectName || undefined,
          IsDeleted:
            queryParams.isDeleted === ""
              ? undefined
              : queryParams.isDeleted === "true",
        },
      });
      setTopics(res?.data?.data?.items || []);
      setTotal(res?.data?.data?.total || 0);
    } catch (e) {
      console.log("Error", e);
    } finally {
      setLoading(false);
    }
  };

  const onEditClick = async (record) => {
    try {
      const res = await api.get(`topics/${record.id}`);
      setEditingTopic(res?.data?.data);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch topic details:", error);
      toast.error("Invalid data. Cannot update.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.patch(`topics/${id}`, { isDeleted: true });
      toast.success("Deleted successfully.");
      fetchTopics();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops! Could not delete the item.");
    }
  };

  useEffect(() => {
    fetchTopics();
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
      title: "Level",
      dataIndex: "level",
      key: "level",
      filters: [
        { text: "easy", value: "easy" },
        { text: "medium", value: "medium" },
        { text: "hard", value: "hard" },
      ],
      filteredValue: queryParams.level ? [queryParams.level] : null,
      onFilter: (value, record) => record.level === value,
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subjectName",
    },
    {
      title: "Parent Id",
      dataIndex: "parentId",
      key: "parentId",
      sorter: (a, b) => a.parentId - b.parentId,
    },

    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <InfoCircleOutlined
            onClick={() => navigate(`/topics/${record.id}/detail`)}
            style={{ color: "#046142ff", cursor: "pointer", marginRight: 15 }}
          />
          <EditOutlined
            onClick={() => onEditClick(record)}
            style={{ color: "#633fea", cursor: "pointer", marginRight: 15 }}
          />
          <Popconfirm
            title="Are you sure to delete this topic?"
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

  const data = topics.map((t) => ({
    key: t.id,
    ...t,
  }));

  return (
    <Dashboard>
      <div
        style={{ display: "flex", gap: 8, marginLeft: "50%" }}
      >
        <Input
          placeholder="Search by Topic name or Subject Name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onPressEnter={() =>
            updateURLAndParams({ search: searchInput, page: 1 })
          }
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          onClick={() => updateURLAndParams({ search: searchInput, page: 1 })}
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
            level: filters.level?.[0] || "",
            subjectName: filters.subjectName?.[0] || "",
            isDeleted: filters.status?.[0] || "",
          });
        }}
        modalContent={({ onSuccess }) => (
          <CreateTopicForm
            onCreated={() => {
              fetchTopics();
              onSuccess();
            }}
          />
        )}
        onCloseModal={() => fetchTopics()}
      />

      <Modal
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <UpdateTopicForm
          initialValues={editingTopic}
          onUpdated={() => {
            fetchTopics();
            setIsEditModalVisible(false);
          }}
        />
      </Modal>
    </Dashboard>
  );
}

export default TopicManager;
