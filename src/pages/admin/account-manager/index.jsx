import React from "react";
import { Table, Input } from "antd";
import AdminDashboardComponent from "../../../components/admin/dashboard";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import "./index.scss";

const AccountManager = () => {
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
      sorter: (a, b) => a.name.localeCompare(b.name),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      sorter: (a, b) => new Date(a.createDate) - new Date(b.createDate),
    },
    {
      title: "Exams",
      dataIndex: "exams",
      key: "exams",
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
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
    <AdminDashboardComponent>
      <div className="account-manager">
        <div className="account-manager__header">
          <button>
            <FilterFilled />
          </button>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          }}
        />
      </div>
    </AdminDashboardComponent>
  );
};

export default AccountManager;
