import { Form, Input, Button, Select } from "antd";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import exApi from "../../../../config/exApi";

const CreateQuestionForm = ({ onCreated }) => {
  const [form] = Form.useForm();
  const { id: topicId } = useParams(); // id ở đây là topicId từ URL

  const handleFinish = async (values) => {
    try {
      const res = await exApi.post(`questions/${topicId}`, values);
      console.log(res);
      toast.success("Question created successfully!");
      form.resetFields();
      onCreated?.();
    } catch (error) {
      console.error("Error creating question:", error);
      toast.error("Failed to create question.");
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="content"
        label="Content"
        rules={[
          { required: true, message: "Please enter the question content" },
        ]}
      >
        <Input.TextArea placeholder="Enter question content" rows={3} />
      </Form.Item>

      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: "Please select question type" }]}
      >
        <Select placeholder="Select type">
          <Select.Option value="essay">Essay</Select.Option>
          <Select.Option value="multiple_choice">Multiple Choice</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="difficultyLevel"
        label="Difficulty Level"
        rules={[{ required: true, message: "Please select difficulty level" }]}
      >
        <Select placeholder="Select difficulty">
          <Select.Option value="easy">Easy</Select.Option>
          <Select.Option value="medium">Medium</Select.Option>
          <Select.Option value="hard">Hard</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select status" }]}
      >
        <Select placeholder="Select status">
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Question
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateQuestionForm;
