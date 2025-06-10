import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import "./index.scss";

const data = [
  { rating: "5", count: 1402 },
  { rating: "4", count: 1360 },
  { rating: "3", count: 1120 },
  { rating: "2", count: 600 },
];

const RatingChart = () => {
  return (
    <BarChart
      barSize={20}
      width={500}
      height={280}
      data={data}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="rating" type="category" />
      <Tooltip />
      <Bar dataKey="count" fill="#a48bff" radius={[10, 10, 10, 10]}>
        <LabelList dataKey="count" position="right" fill="#333" />
      </Bar>
    </BarChart>
  );
};

export default RatingChart;
