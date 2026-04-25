import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function SkillChart({ found, missing }) {

  const data = {
    labels: ["Found Skills", "Missing Skills"],
    datasets: [
      {
        data: [found.length, missing.length],
        backgroundColor: ["#16a34a", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

return (
  <div className="bg-white p-6 rounded-2xl shadow-soft border h-full">
    <h2 className="mb-4 font-semibold">Skill Distribution</h2>
    
    <div className="h-[250px]">
      <Pie data={data} />
    </div>
  </div>
);
}

export default SkillChart;