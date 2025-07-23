import React, { useEffect, useState } from "react";
import { Upload, Button, Form, Select, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import exApi from "../../../config/exApi";
import { toast } from "react-toastify";
import api from "../../../config/axios";

const UploadQuestionForm = ({ onSuccess, onCloseModal }) => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjectId, setSubjectId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  // Fetch subjects from API
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const res = await api.get("/subjects");
        setSubjects(res.data.data.items || []);
      } catch (error) {
        toast.error("Failed to fetch subjects.");
        console.error("Subject fetch error:", error);
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, []);

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
    if (!subjectId) {
      toast.error("Please select a subject.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await exApi.post("Supabase/files", formData);
      console.log(res);
      const { data: signedData } = await exApi.get(
        "Supabase/files/{fileName}/signed-url",
        {
          params: { fileName: file.name },
        }
      );

      await exApi.post("questions/ai-generations/from-url", null, {
        params: {
          fileUrl: signedData?.data,
          subjectId: subjectId,
        },
      });

      toast.success("File uploaded and saved successfully!");
      setFile(null);
      setFileList([]);
      setSubjectId(null);
      onSuccess?.();
      onCloseModal?.();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Select Subject" required>
        {loadingSubjects ? (
          <Spin />
        ) : (
          <Select
            placeholder="Choose a subject"
            value={subjectId}
            onChange={(value) => setSubjectId(value)}
          >
            {subjects.map((subject) => (
              <Select.Option key={subject.id} value={subject.id}>
                {subject.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

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
        disabled={!file || !subjectId}
      >
        Submit
      </Button>
    </Form>
  );
};

export default UploadQuestionForm;
