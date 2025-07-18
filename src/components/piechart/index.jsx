import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import api from "../../config/axios";

const COLORS = ["#a48bff", "#f9a8d4", "#3b82f6"];

const PieChartComponent = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await api.get("/DashboardControllerAdmin/user/overview");
      const users = response?.data?.usersByAccountType;

      if (users) {
        const formattedData = [
          { name: "Free", value: users.free || 0 },
          { name: "Premium", value: users.premium || 0 },
        ];

        console.log(userData);
        setUserData(formattedData);
      }
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  };
  return (
    <PieChart width={300} height={200}>
      <Pie
        data={userData}
        cx={140}
        cy={80}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        labelLine={false}
      >
        {userData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
