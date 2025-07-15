// components/admin/UploadQuestionForm.js
import React, { useState } from "react";
import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import exApi from "../../../config/exApi";
import { toast } from "react-toastify";

const UploadQuestionForm = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (info) => {
    const selectedFile = info.fileList?.[0]?.originFileObj || null;

    if (selectedFile) {
      const isPDF = selectedFile.type === "application/pdf";
      const isTooLarge = selectedFile.size > 5 * 1024 * 1024;

      if (!isPDF) {
        toast.error("Only PDF files are allowed.");
        setFile(null);
        setFileList([]);
        return;
      }

      if (isTooLarge) {
        toast.error("File size must be less than 5MB.");
        setFile(null);
        setFileList([]);
        return;
      }
    }

    setFile(selectedFile);
    setFileList(info.fileList);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a PDF file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      await exApi.post("Supabase/upload_storage", formData);

      const { data: signedData } = await exApi.get("Supabase/getSignUrl", {
        params: { fileName: file.name },
      });

      await exApi.post("question/insert", null, {
        params: {
          fileUrl: signedData?.data,
        },
      });

      toast.success("File uploaded and saved successfully!");
      setFile(null);
      setFileList([]);
      onSuccess?.();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Upload a PDF question file">
        <Upload
          beforeUpload={() => false}
          accept="application/pdf"
          maxCount={1}
          onChange={handleFileChange}
          fileList={fileList}
          showUploadList={{ showRemoveIcon: true }}
          onRemove={() => {
            setFile(null);
            setFileList([]);
          }}
        >
          <Button icon={<UploadOutlined />}>Select PDF File</Button>
        </Upload>
      </Form.Item>
      <Button
        type="primary"
        onClick={handleSubmit}
        loading={loading}
        disabled={!file}
      >
        Submit
      </Button>
    </Form>
  );
};

export default UploadQuestionForm;
