import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Thống kê lượng người dùng",
    },
  },
};

const labels = ["Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"];
const register = [20, 18, 20, 10];
const use = [10, 15, 21, 30];

export const data = {
  labels,
  datasets: [
    {
      label: "Số người dùng đăng ký",
      data: register.map((number) => number),

      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Số người dùng truy cập",
      data: use.map((number) => number),

      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Chart() {
  return <Bar options={options} data={data} />;
}
