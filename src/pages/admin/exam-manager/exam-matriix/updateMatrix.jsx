import { Form, Button, message, Select } from "antd";
import { useEffect, useState } from "react";
import api from "../../../../config/axios";

const { Option } = Select;

const examTypeEnum = {
  1: "Midterm 1",
  2: "End of Term 1",
  3: "Midterm 2",
  4: "End of Term 2",
};

const statusEnum = {
  1: "Active",
  2: "Inactive",
};

const UpdateMatrixForm = ({ initialValues, onUpdated }) => {
  const [form] = Form.useForm();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const getEnumKeyByLabel = (enumObj, label) => {
    return parseInt(
      Object.entries(enumObj).find(
        ([, v]) =>
          v.replaceAll(" ", "_").toLowerCase() ===
          label.replaceAll(" ", "_").toLowerCase()
      )?.[0]
    );
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        subjectId: initialValues.subjectId,
        examTypeEnum: getEnumKeyByLabel(examTypeEnum, initialValues.examtype),
        statusEnum: getEnumKeyByLabel(statusEnum, initialValues.status),
      });
    }
  }, [initialValues, form]);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("subjects");
      setSubjects(res.data?.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy subject", err);
      message.error("Không thể tải danh sách môn học");
    }
  };

  const handleFinish = async (values) => {
    try {
      await api.put(`exam_matrixs/${initialValues.id}`, {
        subjectId: values.subjectId,
        examTypeEnum: values.examTypeEnum,
        statusEnum: values.statusEnum,
      });

      message.success("Cập nhật matrix thành công");
      onUpdated?.();
    } catch (err) {
      console.error("Lỗi cập nhật matrix", err);
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="subjectId"
        label="Subject"
        rules={[{ required: true, message: "Please select a subject" }]}
      >
        <Select placeholder="Select a subject">
          {subjects.map((s) => (
            <Option key={s.id} value={s.id}>
              {s.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="examTypeEnum"
        label="Exam Type"
        rules={[{ required: true, message: "Please choose exam type" }]}
      >
        <Select placeholder="Choose exam type">
          {Object.entries(examTypeEnum).map(([value, label]) => (
            <Option key={value} value={parseInt(value)}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="statusEnum"
        label="Status"
        rules={[{ required: true, message: "Please choose status" }]}
      >
        <Select placeholder="Choose status">
          {Object.entries(statusEnum).map(([value, label]) => (
            <Option key={value} value={parseInt(value)}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Exam Matrix
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateMatrixForm;
