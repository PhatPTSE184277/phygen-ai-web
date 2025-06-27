import { Form, Input, Button, message } from "antd";
import api from "../../../config/axios"; // import api nếu bạn dùng axios instance

const CreateUserForm = ({ onCreated }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      values.accountType = 1;
      await api.post("AccountAdmin", values);
      message.success("Tạo user thành công");
      onCreated?.();
      form.resetFields();
    } catch (error) {
      message.error("Tạo user thất bại");
      console.error(error);
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input placeholder="Enter username" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUserForm;
