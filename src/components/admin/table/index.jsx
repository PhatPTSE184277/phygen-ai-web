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
  modalContent,
  onCloseModal,
  total,
  onChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className="customTable">
      <div className="customTable__header">
        <button onClick={showModal}>
          <FolderAddOutlined style={{ fontSize: 20 }} />
        </button>
      </div>

      <Table
        columns={columns}
        loading={loading}
        dataSource={data}
        onChange={onChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
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
            handleCancel();
            onCloseModal?.();
          },
        })}
      </Modal>
    </div>
  );
}

export default ReuseTable;
