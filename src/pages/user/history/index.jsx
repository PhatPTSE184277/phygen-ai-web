import React from "react";
import Dashboard from "../../../components/dashboard";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { Checkbox, Input, Table } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";

function History() {
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "TITLE",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "CONTENT",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "CREATE DATE",
      dataIndex: "createDate",
      key: "createDate",
      sorter: (a, b) => new Date(a.createDate) - new Date(b.createDate),
    },
    {
      title: "CLASS",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "NUMBER",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "ANSWER",
      key: "account",
      render: () => <Checkbox />,
    },
  ];

  const data = Array.from({ length: 97 }, (_, index) => ({
    key: index,
    id: index + 1,
    name: "Ann Culhane",
    createDate: "23/05/2004",
    exams: 40,
    account: "Premium",
  }));
  return (
    <Dashboard>
      <div className="user-history">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="user-history__header">
            <button className="user-history__filter__button">
              <FilterFilled />
            </button>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
            />
          </div>
          <Link to="/history/generate">
            <div className="user-history__generate__button">
              <button>+ Generate Exam</button>
            </div>
          </Link>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
        />
      </div>
    </Dashboard>
  );
}

export default History;
