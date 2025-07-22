import { Form, Input, Button, Select } from "antd";
import api from "../../../config/axios"; // import api nếu bạn dùng axios instance
import { toast } from "react-toastify";

const CreateUserForm = ({ onCreated }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      values.accountType = 1;
      await api.post("account_admins", values);
      toast.success("Create successful!");
      onCreated?.();
      form.resetFields();
    } catch (error) {
      toast.error("Oops! There was a problem creating.");
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
      <Form.Item name="role" label="Role">
        <Select>
          <Select.Option value={1}>User</Select.Option>
          <Select.Option value={2}>Admin</Select.Option>
          <Select.Option value={3}>Manager</Select.Option>
        </Select>
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
