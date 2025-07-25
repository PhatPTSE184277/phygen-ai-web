import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../../config/axios";
const monthMap = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

const Rechart = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchMonthlyRevenue();
  }, []);

  const fetchMonthlyRevenue = async () => {
    try {
      const response = await api.get("admin/dashboard/monthly/revenue");
      const raw = response?.data || {};

      const sortedEntries = Object.entries(raw).sort(
        ([a], [b]) => new Date(b) - new Date(a)
      );

      // Lấy 6 tháng gần nhất rồi đảo ngược để hiển thị từ cũ đến mới
      const last6Months = sortedEntries.slice(0, 6).reverse();

      const formattedData = last6Months.map(([monthStr, value]) => {
        const month = monthStr.split("-")[1];
        return {
          name: monthMap[month] || monthStr,
          value,
        };
      });

      setRevenueData(formattedData);
    } catch (error) {
      console.error("Error fetching monthly revenue:", error);
    }
  };

  return (
    <div style={{ width: "90%", height: 200 }}>
      <ResponsiveContainer >
        <AreaChart
          width={1004}
          data={revenueData}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorExam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a48bff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#a48bff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#a48bff"
            fillOpacity={1}
            fill="url(#colorExam)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Rechart;
