"use client";
import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const weeklyData = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"],
    datasets: [
        {
            label: "User Growth",
            data: [80, 52, 120, 160, 198, 162],
            fill: true,
            backgroundColor: "rgba(208, 154, 64, 0.2)",
            borderColor: "rgba(208, 154, 64, 1)",
            tension: 0.4,
            pointBackgroundColor: "rgba(208, 154, 64, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 6,
            pointRadius: 6,
        },
    ],
};

const monthlyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
            label: "User Growth",
            data: [400, 320, 500, 450],
            fill: true,
            backgroundColor: "rgba(208, 154, 64, 0.2)",
            borderColor: "rgba(208, 154, 64, 1)",
            tension: 0.4,
            pointBackgroundColor: "rgba(208, 154, 64, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 6,
            pointRadius: 6,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false, // hide legend
        },
        tooltip: {
            enabled: true,
        },
    },
    scales: {
        x: {
            grid: {
                drawTicks: false,
                drawBorder: false,
                color: "#E5E5E5",
            },
        },
        y: {
            grid: {
                drawTicks: false,
                drawBorder: false,
                color: "#E5E5E5",
            },
            beginAtZero: true,
            ticks: {
                stepSize: 50,
            },
        },
    },
};

const Report: React.FC = () => {
    const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly");

    return (
        <div className="bg-[#FDF7ED] pt-5 pl-6 pr-9 shadow shadow-[#00000033] rounded-[12px] max-w-xl pb-3 ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#10101E]">User Growth</h2>
                <div className="flex gap-4 text-sm font-medium text-gray-500 items-center">
                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={timeframe === "weekly"}
                            onChange={() => setTimeframe("weekly")}
                            className="accent-[#D09A40] w-4 h-4 rounded-full "
                        />
                        Weekly
                    </label>
                    <label className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={timeframe === "monthly"}
                            onChange={() => setTimeframe("monthly")}
                            className="accent-[#D09A40] w-4 h-4 rounded-full "
                        />
                        Monthly
                    </label>
                </div>
            </div>
            <Line data={timeframe === "weekly" ? weeklyData : monthlyData} options={options} />
        </div>
    );
};

export default Report;
