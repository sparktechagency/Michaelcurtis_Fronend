"use client";
import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ChartData,
    ScriptableContext,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useUserGrowthReportQuery } from "@/app/api/admin/reportApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const createGradient = (ctx: CanvasRenderingContext2D, chartArea: { top: number; bottom: number }) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "rgba(208,154,64,0.2)");
    gradient.addColorStop(1, "rgba(208,154,64,1)");
    return gradient as unknown as string; // type assertion for Chart.js
};



const ProviderChart: React.FC = () => {
    const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly");
    const { data } = useUserGrowthReportQuery({ timeframe })

    const weeklyData: ChartData<"bar", number[], string> = {
        labels: data?.data?.top_providers?.labels,
        datasets: [
            {
                label: "Reviews",
                data: data?.data?.top_providers?.data,
                backgroundColor: (context: ScriptableContext<"bar">) => {
                    const { ctx, chartArea } = context.chart;
                    if (!chartArea) return "rgba(208,154,64,0.2)";
                    return createGradient(ctx, chartArea);
                },
                borderRadius: 8,
            },
        ],
    };

    const monthlyData: ChartData<"bar", number[], string> = {
        labels: data?.data?.top_providers?.labels,
        datasets: [
            {
                label: "Reviews",
                data: data?.data?.top_providers?.data,
                backgroundColor: (context: ScriptableContext<"bar">) => {
                    const { ctx, chartArea } = context.chart;
                    if (!chartArea) return "rgba(208,154,64,0.2)";
                    return createGradient(ctx, chartArea);
                },
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 50,
                },
                grid: {
                    color: "#E5E5E5",
                },
            },
        },
    };

    return (
        <div className="bg-[#FDF7ED] shadow shadow-[#00000033] rounded-[12px] pt-5 pl-6 pr-9  max-w-4xl  pb-3">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#10101E]">Top Providers by Reviews</h2>
                <div className="flex gap-4 text-sm font-medium text-gray-500 items-center">
                    <label className="flex items-center gap-1 cursor-pointer">
                        <input
                            type="radio"
                            name="timeframe"
                            checked={timeframe === "weekly"}
                            onChange={() => setTimeframe("weekly")}
                            className="accent-[#D09A40] w-4 h-4"
                        />
                        <span className={`${timeframe === "weekly" ? "text-[#D09A40]" : "text-gray-400"}`}>Weekly</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                        <input
                            type="radio"
                            name="timeframe"
                            checked={timeframe === "monthly"}
                            onChange={() => setTimeframe("monthly")}
                            className="accent-[#D09A40] w-4 h-4"
                        />
                        <span className={`${timeframe === "monthly" ? "text-[#D09A40]" : "text-gray-400"}`}>Monthly</span>
                    </label>
                </div>
            </div>
            <Bar data={timeframe === "weekly" ? weeklyData : monthlyData} options={options} />
        </div>
    );
};

export default ProviderChart;
