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

const UpdateMatrixDetailForm = ({ initialValues, onUpdated }) => {
  const [form] = Form.useForm();
  const [sections, setSections] = useState([]);
  const [topics, setTopics] = useState([]);

  const getEnumValueFromLabel = (enumObj, label) => {
    return parseInt(
      Object.entries(enumObj).find(
        ([, v]) =>
          v.replaceAll(" ", "_").toLowerCase() ===
          label.replaceAll(" ", "_").toLowerCase()
      )?.[0]
    );
  };

  useEffect(() => {
    fetchSections();
    fetchTopics();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        matrixSectionId: initialValues.matrixSectionId,
        topicId: initialValues.topicId,
        levelEnum: getEnumValueFromLabel(
          levelEnum,
          initialValues.difficultyLevel
        ),
        typeEnum: getEnumValueFromLabel(typeEnum, initialValues.type),
        quantity: initialValues.quantity,
      });
    }
  }, [initialValues, form]);
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
      await api.put(`matrix_details/${initialValues.id}`, values);
      message.success("Cập nhật Matrix Detail thành công");
      onUpdated?.();
    } catch (err) {
      console.error(err);
      message.error("Cập nhật thất bại");
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
          Update Exam Matrix Detail
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateMatrixDetailForm;
