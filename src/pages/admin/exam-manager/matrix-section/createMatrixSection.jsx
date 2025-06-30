import { Form, InputNumber, Button, message, Select, Input } from "antd";
import { useEffect, useState } from "react";
import api from "../../../../config/axios";

const CreateMatrixSectionForm = ({ onCreated }) => {
  const [form] = Form.useForm();
  const [examMatrix, setExamMatrix] = useState([]);

  useEffect(() => {
    fetchExamMatrix();
  }, []);

  const fetchExamMatrix = async () => {
    try {
      const res = await api.get("exam_matrixs/active");
      setExamMatrix(res.data.data || []);
    } catch (err) {
      console.log(err);
      message.error("Không thể tải danh sách topic");
    }
  };

  const handleFinish = async (values) => {
    try {
      const res = await api.post("matrix_sections", values);
      message.success(res.data.message);
      form.resetFields();
      onCreated?.();
    } catch (err) {
      console.error(err);
      message.error("Tạo mới thất bại");
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="matrixId"
        label="Exam Matrix Id"
        rules={[{ required: true, message: "Please select section" }]}
      >
        <Select placeholder="Select a section">
          {examMatrix.map((s) => (
            <Select.Option key={s.id} value={s.id}>
              {s.id}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="sectionName"
        label="Section Name"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <Input.TextArea placeholder="Enter subject description" />
      </Form.Item>

      <Form.Item
        name="displayOrder"
        label="Display Order"
        rules={[{ required: true, message: "Please input quantity" }]}
      >
        <InputNumber
          min={1}
          placeholder="Enter display order"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Exam Matrix Detail
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateMatrixSectionForm;
