import React, { useEffect, useState } from "react";
import "./index.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import exApi from "../../config/exApi";

const RoundedBar = (props) => {
  const { x, y, width, height, fill } = props;
  const radius = 8;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius}
      ry={radius}
      fill={fill}
      className="custom-bar"
    />
  );
};
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BarChartComponent = () => {
  const [dataChart, setDataChart] = useState([]);

  const fetchChartData = async () => {
    try {
      const response = await exApi.get(
        `dashboard/exams/monthly-counts?targetYear=${2025}`
      );
      const rawData = response?.data?.data;


      const currentMonth = new Date().getMonth() + 1;
      const recentMonths = [];
      for (let i = 5; i >= 0; i--) {
        let month = currentMonth - i;
        if (month <= 0) month += 12;
        recentMonths.push(month);
      }

      const formattedData = recentMonths.map((m) => ({
        name: monthNames[m - 1],
        value: rawData[m] || 0,
      }));

      setDataChart(formattedData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <BarChart width={450} height={180} data={dataChart} barSize={15}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#a48bff" shape={<RoundedBar />} name="Exam" />
    </BarChart>
  );
};

export default BarChartComponent;
