import React from "react";
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

const data = [
  { name: "April", value: 19990 },
  { name: "May", value: 17250 },
  { name: "June", value: 14650 },
  { name: "July", value: 11230 },
  { name: "August", value: 9856 },
  { name: "Sep", value: 8600 },
];

const BarChartComponent = () => {
  return (
    <BarChart width={550} height={260} data={data} barSize={20}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#a48bff" shape={<RoundedBar />} name="Exam" />
    </BarChart>
  );
};

export default BarChartComponent;
