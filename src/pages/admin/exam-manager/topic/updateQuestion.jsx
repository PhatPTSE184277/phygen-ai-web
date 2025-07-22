import { Form, Input, Select, Button } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import exApi from "../../../../config/exApi";

const typeEnum = {
  essay: "Essay",
  multiple_choice: "Multiple Choice",
};

const difficultyEnum = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const statusEnum = {
  active: "Active",
  inactive: "Inactive",
};

const getEnumKeyByLabel = (enumObj, label) => {
  if (!label) return undefined;
  const found = Object.entries(enumObj).find(
    ([, v]) =>
      v.replaceAll(" ", "").toLowerCase() ===
      label.replaceAll(" ", "").toLowerCase()
  );
  return found ? found[0] : undefined;
};

const UpdateQuestionForm = ({ initialValues, onUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        content: initialValues.content,
        type: getEnumKeyByLabel(typeEnum, initialValues.type),
        difficultyLevel: getEnumKeyByLabel(
          difficultyEnum,
          initialValues.difficultyLevel
        ),
        status: getEnumKeyByLabel(statusEnum, initialValues.status),
      });
    }
  }, [initialValues, form]);

  const handleFinish = async (values) => {
    try {
      await exApi.put(`questions/${initialValues.id}`, values);
      toast.success("Question updated successfully!");
      onUpdated?.();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Oops! There was a problem updating the question.");
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="content"
        label="Content"
        rules={[{ required: true, message: "Please enter question content" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter question content" />
      </Form.Item>

      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: "Please select question type" }]}
      >
        <Select placeholder="Select type">
          {Object.entries(typeEnum).map(([key, label]) => (
            <Select.Option key={key} value={key}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="difficultyLevel"
        label="Difficulty Level"
        rules={[{ required: true, message: "Please select difficulty" }]}
      >
        <Select placeholder="Select difficulty">
          {Object.entries(difficultyEnum).map(([key, label]) => (
            <Select.Option key={key} value={key}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select status" }]}
      >
        <Select placeholder="Select status">
          {Object.entries(statusEnum).map(([key, label]) => (
            <Select.Option key={key} value={key}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Question
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateQuestionForm;
