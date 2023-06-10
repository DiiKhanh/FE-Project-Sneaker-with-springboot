import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Thống kê số lượng giày",
    },
  },
};

const labels = ["Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"];
const imports = [50, 60, 35, 70];
const exports = [30, 45, 30, 50];

export const data = {
  labels,
  datasets: [
    {
      label: "Số lượng giày đã nhập",
      data: imports.map((i) => i),

      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Số lượng giày đã bán",
      // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      data: exports.map((i) => i),

      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function LineChart() {
  return <Line options={options} data={data} />;
}
