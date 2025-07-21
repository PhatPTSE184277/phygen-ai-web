import { Form, InputNumber, Button, Select, Input } from "antd";
import { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { toast } from "react-toastify";

const CreateMatrixSectionForm = ({ onCreated }) => {
  const [form] = Form.useForm();
  const [examMatrix, setExamMatrix] = useState([]);

  useEffect(() => {
    fetchExamMatrix();
  }, []);

  const fetchExamMatrix = async () => {
    try {
      const res = await api.get("exam_matrices?Status=active");
      const items = res.data.data?.items ?? [];
      setExamMatrix(Array.isArray(items) ? items : []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load the list.");
      setExamMatrix([]);
    }
  };

  const handleFinish = async (values) => {
    try {
      await api.post("matrix_sections", values);
      toast.success("Create successful!");
      form.resetFields();
      onCreated?.();
    } catch (err) {
      console.error(err);
      toast.error("Oops! There was a problem creating.");
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
          Create Exam Matrix Section
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateMatrixSectionForm;
