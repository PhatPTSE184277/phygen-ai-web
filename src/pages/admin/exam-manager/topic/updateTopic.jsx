import { Form, Input, Button, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";
import api from "../../../../config/axios";
import { toast } from "react-toastify";

const levelEnum = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
};

const UpdateTopicForm = ({ initialValues, onUpdated }) => {
  const [form] = Form.useForm();
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, []);

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
        subjectId: initialValues.subjectId,
        levelEnum: getEnumKeyByLabel(levelEnum, initialValues.level),
        parentId: initialValues.parentId,
      });
    }
  }, [initialValues, form]);

  const fetchSubject = async () => {
    try {
      const res = await api.get("subjects?IsDeleted=false");
      const items = res.data.data?.items ?? [];
      setSubject(Array.isArray(items) ? items : []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load the list.");
      setSubject([]);
    }
  };

  const handleFinish = async (values) => {
    try {
      await api.put(`topics/${initialValues.id}`, values);

      toast.success("Update successful!");
      onUpdated?.();
    } catch (err) {
      console.error("Lỗi cập nhật môn học", err);
      toast.error("Oops! There was a problem updating.");
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
       
      >
        <InputNumber
          min={1}
          placeholder="Enter quantity"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Topic
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateTopicForm;
