import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Dashboard from "../../../components/dashboard";
import exApi from "../../../config/exApi";
import ReuseTable from "../../../components/admin/table";
import CreateQuestionForm from "../../admin/exam-manager/topic/createQuestion";
import UpdateQuestionForm from "../../admin/exam-manager/topic/updateQuestion";

function TopicQuestion() {
  const { id: topicId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [editingTopic, setEditingTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [queryParams, setQueryParams] = useState({
    page: parseInt(searchParams.get("page")) || 1,
    pageSize: parseInt(searchParams.get("pageSize")) || 10,
    sortBy: searchParams.get("sortBy") || "id",
    sortDir: searchParams.get("sortDir") || "desc",
  });

  const updateURLAndParams = (newParams) => {
    const updated = { ...queryParams, ...newParams };
    const urlParams = new URLSearchParams({
      page: updated.page,
      pageSize: updated.pageSize,
      sortBy: updated.sortBy,
      sortDir: updated.sortDir,
    });
    navigate(`/admin/topics/${topicId}/detail?${urlParams.toString()}`);
    setQueryParams(updated);
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await exApi.get(`questions/by-topic/${topicId}`, {
        params: {
          page: queryParams.page - 1,
          size: queryParams.pageSize,
          sortBy: queryParams.sortBy,
          sortDir: queryParams.sortDir,
        },
      });
      setQuestions(res?.data?.data?.content || []);
      setTotal(res?.data?.data?.totalElements || 0);
    } catch (err) {
      console.error("Error fetching questions:", err);
      toast.error("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };
  const onEditClick = async (record) => {
    try {
      setEditingTopic(record);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch topic details:", error);
      toast.error("Invalid data. Cannot update.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await exApi.delete(`questions/${id}`);
      toast.success("Deleted successfully.");
      fetchQuestions();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Oops! Could not delete the item.");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [topicId, queryParams]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Difficulty",
      dataIndex: "difficultyLevel",
      key: "difficultyLevel",
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

  const data = questions.map((q) => ({
    key: q.id,
    ...q,
  }));

  return (
    <Dashboard>
      <h2
        style={{
          marginBottom: 16,
          fontFamily: "Poppins, poppin, sans-serif",
          fontWeight: 400,
          fontSize: 20,
          color: "#5932ea",
        }}
      >
        Questions in Topic #{topicId}
      </h2>

      <ReuseTable
        columns={columns}
        data={data}
        loading={loading}
        pageSize={queryParams.pageSize}
        currentPage={queryParams.page}
        setPageSize={(size) => updateURLAndParams({ pageSize: size })}
        setCurrentPage={(page) => updateURLAndParams({ page })}
        total={total}
        onChange={(pagination, filters, sorter) => {
          updateURLAndParams({
            sortBy: sorter.field || "id",
            sortDir: sorter.order === "descend" ? "desc" : "asc",
            page: pagination.current,
            pageSize: pagination.pageSize,
          });
        }}
        modalContent={({ onSuccess }) => (
          <CreateQuestionForm
            onCreated={() => {
              fetchQuestions();
              onSuccess?.();
            }}
          />
        )}
        onCloseModal={() => fetchQuestions()}
        style={{ fontFamily: "Poppins, poppin, sans-serif" }}
      />

      <Modal
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        style={{ fontFamily: "Poppins, poppin, sans-serif" }}
      >
        <UpdateQuestionForm
          initialValues={editingTopic}
          onUpdated={() => {
            fetchQuestions();
            setIsEditModalVisible(false);
          }}
        />
      </Modal>
    </Dashboard>
  );
}

export default TopicQuestion;
