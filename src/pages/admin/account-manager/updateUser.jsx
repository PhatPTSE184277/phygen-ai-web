import { Form, Input, Button, message, Select } from "antd";
import { useEffect } from "react";
import api from "../../../config/axios";

const UpdateUserForm = ({ initialValues, onUpdated }) => {
  const [form] = Form.useForm();
  console.log("initialValues", initialValues);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        accountStatus: Number(initialValues.statusEnum ?? 1),
        accountType: Number(initialValues.accountTypeEnum ?? 1),
        role: Number(initialValues.roleEnum ?? 1),
        emailVerified: Boolean(initialValues.emailVerified),
      });
    }
  }, [initialValues, form]);

  const handleFinish = async (values) => {
    try {
      await api.put(`AccountAdmin/${initialValues.id}`, {
        username: values.username,
        email: values.email,
        password: initialValues.password,
        role: values.role,
        emailVerified: values.emailVerified,
        accountType: values.accountType,
        accountStatus: values.accountStatus,
      });

      message.success("Cập nhật user thành công");
      onUpdated?.();
    } catch (error) {
      console.error("Update error", error);
      message.error("Cập nhật user thất bại");
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Username không được để trống" }]}
      >
        <Input placeholder="Nhập username" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Email không được để trống" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item name="accountStatus" label="Status">
        <Select>
          <Select.Option value={1}>Active</Select.Option>
          <Select.Option value={2}>Inactive</Select.Option>
          <Select.Option value={3}>Banned</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="accountType" label="Account Type">
        <Select>
          <Select.Option value={1}>Free</Select.Option>
          <Select.Option value={2}>Premium</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="emailVerified" label="Verify Email">
        <Select>
          <Select.Option value={true}>Verified</Select.Option>
          <Select.Option value={false}>Not Verified</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateUserForm;
