import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import AdminDashboardComponent from "../../../components/admin/dashboard";
import exApi from "../../../config/exApi";
import { toast } from "react-toastify";
import ReuseTable from "../../../components/admin/table";
import UploadQuestionForm from "./UploadQuestionForm";

const { Link } = Typography;

const InsertQuestion = () => {
  const [signedUrls, setSignedUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchFileListWithSignedUrls = async () => {
    try {
      setLoading(true);
      const res = await exApi.get("Supabase/fileName");
      const fileNames = res?.data?.data || [];

      const filtered = fileNames.filter((f) =>
        f.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const signedUrlPromises = filtered.map(async (fileName) => {
        try {
          const res = await exApi.get("Supabase/getSignUrl", {
            params: { fileName },
          });
          return {
            fileName,
            url: res?.data?.data || null,
          };
        } catch (err) {
          console.log(err);
          return { fileName, url: null };
        }
      });

      const results = await Promise.all(signedUrlPromises);
      setSignedUrls(results);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load files.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFileListWithSignedUrls();
  }, [searchTerm]);

  const columns = [
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "",
      dataIndex: "url",
      key: "url",
      render: (text, record) =>
        record.url ? (
          <Link href={record.url} target="_blank">
            View File
          </Link>
        ) : (
          "Unavailable"
        ),
    },
  ];

  return (
    <AdminDashboardComponent>
      <ReuseTable
        columns={columns}
        data={signedUrls.map((item, index) => ({ ...item, key: index }))}
        loading={loading}
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        modalContent={({ onSuccess }) => (
          <UploadQuestionForm onSuccess={fetchFileListWithSignedUrls} />
        )}
        onCloseModal={() => fetchFileListWithSignedUrls()}
      />
    </AdminDashboardComponent>
  );
};

export default InsertQuestion;
