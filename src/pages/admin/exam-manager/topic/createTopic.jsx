import { Form, Input, Button, message, Select, InputNumber } from "antd";
import api from "../../../../config/axios";
import { useEffect, useState } from "react";
const levelEnum = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
};
const CreateTopicForm = ({ onCreated }) => {
  const [form] = Form.useForm();
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, []);

  const fetchSubject = async () => {
    try {
      const res = await api.get("subjects/active");
      setSubject(res.data.data || []);
    } catch (err) {
      console.log(err);
      message.error("Không thể tải danh sách topic");
    }
  };

  const handleFinish = async (values) => {
    try {
      const response = await api.post("topics", values);
      console.log(response?.data?.data);
      message.success("Topic created successfully");
      onCreated?.();
      form.resetFields();
    } catch (error) {
      console.error("Error creating Topic:", error);
      message.error("Failed to create Subject");
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Topic Name"
        rules={[{ required: true, message: "Please enter topic name" }]}
      >
        <Input placeholder="Enter topic name" />
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
        name="subjectId"
        label="Subject"
        rules={[{ required: true, message: "Please select topic" }]}
      >
        <Select placeholder="Select a topic">
          {subject.map((s) => (
            <Select.Option key={s.id} value={s.id}>
              {s.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="parentId"
        label="Parent Id"
        rules={[{ required: true, message: "Please input Parent Id" }]}
      >
        <InputNumber
          min={1}
          placeholder="Enter quantity"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Subject
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTopicForm;
