import { Form, Input, Button, Select } from "antd";
// import api nếu bạn dùng axios instance
import { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { toast } from "react-toastify";

const examTypeEnum = {
  1: "Midterm 1",
  2: "End of Term 1",
  3: "Midterm 2",
  4: "End of Term 2",
};

const CreateMatrixForm = ({ onCreated }) => {
  const [form] = Form.useForm();
  const [subjects, setSubjects] = useState([]);

  const handleFinish = async (values) => {
    try {
      values.statusEnum = 1;
      const reponse = await api.post("exam_matrixs", values);

      console.log(reponse?.data?.data);
      toast.success("Create successful!");
      onCreated?.();
      form.resetFields();
    } catch (error) {
      toast.error("Oops! There was a problem creating.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("subjects/active");
      console.log(res?.data?.data);
      setSubjects(res.data.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy subject:", error);
      toast.error("Failed to load the list.");
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
            <Select.Option key={s.id} value={s.id}>
              {s.name}
            </Select.Option>
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Exam Matrix
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateMatrixForm;
