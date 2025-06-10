import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Grade 10", value: 400 },
  { name: "Grade 11", value: 300 },
  { name: "Grade 12", value: 300 },
];

const COLORS = ["#a48bff", "#f9a8d4", "#3b82f6"];

const PieChartComponent = () => {
  return (
    <PieChart width={300} height={250}>
      <Pie
        data={data}
        cx={150}
        cy={120}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
