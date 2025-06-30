import { Form, InputNumber, Button, message, Select } from "antd";
import { useEffect, useState } from "react";
import api from "../../../../config/axios";

const levelEnum = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
};

const typeEnum = {
  1: "Multiple choice",
  2: "Essay question",
};

const CreateMatrixDetailForm = ({ onCreated }) => {
  const [form] = Form.useForm();
  const [sections, setSections] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchSections();
    fetchTopics();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await api.get("matrix_sections");
      setSections(res.data.data || []);
    } catch (err) {
      console.log(err);
      message.error("Không thể tải danh sách section");
    }
  };

  const fetchTopics = async () => {
    try {
      const res = await api.get("topics");
      setTopics(res.data.data || []);
    } catch (err) {
      console.log(err);
      message.error("Không thể tải danh sách topic");
    }
  };

  const handleFinish = async (values) => {
    try {
      const res = await api.post("matrix_details", values);
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
        name="matrixSectionId"
        label="Matrix Section"
        rules={[{ required: true, message: "Please select section" }]}
      >
        <Select placeholder="Select a section">
          {sections.map((s) => (
            <Select.Option key={s.id} value={s.id}>
              {s.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="topicId"
        label="Topic"
        rules={[{ required: true, message: "Please select topic" }]}
      >
        <Select placeholder="Select a topic">
          {topics.map((t) => (
            <Select.Option key={t.id} value={t.id}>
              {t.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="levelEnum"
        label="Level"
        rules={[{ required: true, message: "Please select level" }]}
      >
        <Select placeholder="Select level">
          {Object.entries(levelEnum).map(([value, label]) => (
            <Select.Option key={value} value={parseInt(value)}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="typeEnum"
        label="Type"
        rules={[{ required: true, message: "Please select type" }]}
      >
        <Select placeholder="Select type">
          {Object.entries(typeEnum).map(([value, label]) => (
            <Select.Option key={value} value={parseInt(value)}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="quantity"
        label="Quantity"
        rules={[{ required: true, message: "Please input quantity" }]}
      >
        <InputNumber
          min={1}
          placeholder="Enter quantity"
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

export default CreateMatrixDetailForm;
