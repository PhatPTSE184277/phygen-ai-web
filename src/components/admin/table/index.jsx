import { FolderAddOutlined } from "@ant-design/icons";
import { Input, Modal, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import { useState } from "react";

function ReuseTable({
  columns,
  data,
  loading,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  searchTerm,
  setSearchTerm,
  modalContent,
  onCloseModal,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="customTable">
      <div className="customTable__header">
        <button onClick={showModal}>
          <FolderAddOutlined style={{ fontSize: 20 }} />
        </button>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset về trang 1 khi search
          }}
        />
      </div>
      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        pagination={{
          current: currentPage, // <-- thêm dòng này
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50"],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          onChange: (page, newPageSize) => {
            setCurrentPage(page);
            setPageSize(newPageSize);
          },
        }}
      />

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        {modalContent({
          onSuccess: () => {
            handleCancel(); // đóng modal
            onCloseModal?.(); // gọi callback cha nếu có
          },
        })}
      </Modal>
    </div>
  );
}

export default ReuseTable;
