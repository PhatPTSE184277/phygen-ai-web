import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "April", value: 1000 },
  { name: "May", value: 6000 },
  { name: "June", value: 21000 },
  { name: "July", value: 18000 },
  { name: "August", value: 23000 },
  { name: "September", value: 12000 },
  { name: "October", value: 4000 },
];

const Rechart = () => {
  return (
    <div style={{ width: "95%", height: 280 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
