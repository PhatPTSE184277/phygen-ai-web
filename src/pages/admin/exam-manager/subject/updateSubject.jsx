import { Form, Input, Button, message, Select } from "antd";
import { useEffect } from "react";
import api from "../../../../config/axios";

const gradeEnum = {
  1: "Grade 10",
  2: "Grade 11",
  3: "Grade 12",
};

const UpdateSubjectForm = ({ initialValues, onUpdated }) => {
  const [form] = Form.useForm();

  const getEnumKeyByLabel = (enumObj, label) => {
    if (!label) return undefined;
    const found = Object.entries(enumObj).find(
      ([, v]) =>
        v.replaceAll(" ", "").toLowerCase() ===
        label.replaceAll(" ", "").toLowerCase()
    );
    return found ? parseInt(found[0]) : undefined;
  };
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        description: initialValues.description,
        gradeEnum: getEnumKeyByLabel(gradeEnum, initialValues.grade),
      });
    }
  }, [initialValues, form]);

  const handleFinish = async (values) => {
    try {
      await api.put(`subjects/${initialValues.id}`, {
        name: values.name,
        description: values.description,
        gradeEnum: values.gradeEnum,
      });

      message.success("Cập nhật môn học thành công");
      onUpdated?.();
    } catch (err) {
      console.error("Lỗi cập nhật môn học", err);
      message.error("Cập nhật thất bại");
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

export default UpdateSubjectForm;
