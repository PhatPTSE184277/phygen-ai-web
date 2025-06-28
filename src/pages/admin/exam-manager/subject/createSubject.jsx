import { Form, Input, Button, message, Select } from "antd";
import api from "../../../../config/axios";

const gradeEnum = {
  1: "Grade 10",
  2: "Grade 11",
  3: "Grade 12",
};

const CreateSubjectForm = ({ onCreated }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      const response = await api.post("subjects", values);
      console.log(response?.data?.data);
      message.success("Subject created successfully");
      onCreated?.();
      form.resetFields();
    } catch (error) {
      console.error("Error creating subject:", error);
      message.error("Failed to create Subject");
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Subject Name"
        rules={[{ required: true, message: "Please enter subject name" }]}
      >
        <Input placeholder="Enter subject name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <Input.TextArea placeholder="Enter subject description" />
      </Form.Item>

      <Form.Item
        name="gradeEnum"
        label="Grade"
        rules={[{ required: true, message: "Please select grade" }]}
      >
        <Select placeholder="Select grade">
          {Object.entries(gradeEnum).map(([value, label]) => (
            <Select.Option key={value} value={parseInt(value)}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Subject
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateSubjectForm;
