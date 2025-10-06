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
import { useUserGrowthReportQuery } from "@/app/api/admin/reportApi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);



const Report: React.FC = () => {

    const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly");
    const { data } = useUserGrowthReportQuery({ timeframe })
    console.log(data?.data?.user_growth)

    const weeklyData = {
        labels: data?.data?.user_growth?.labels,
        datasets: [
            {
                label: "User Growth",
                data: data?.data?.user_growth?.data,
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
        labels: data?.data?.user_growth?.labels,
        datasets: [
            {
                label: "User Growth",
                data: data?.data?.user_growth?.data,
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

    return (
        <div className="bg-[#FDF7ED] pt-5 pl-6 pr-9 shadow shadow-[#00000033] rounded-[12px] max-w-4xl pb-3 ">
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
