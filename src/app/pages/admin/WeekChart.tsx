"use client";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
    ScriptableContext,
    Color,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAdminActivityQuery } from "@/app/api/admin/adminApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// ✅ Define types
type BarChartData = ChartData<"bar", number[], string>;
type BarChartOptions = ChartOptions<"bar">;

// ✅ Chart data


// ✅ Chart options
const options: BarChartOptions = {
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

const WeekChart: React.FC = () => {
    const { data } = useAdminActivityQuery({});


    const weeklyData: BarChartData = {
        labels: data?.reviewsPerWeek?.labels,
        datasets: [
            {
                label: "Reviews",
                data: data?.reviewsPerWeek?.data,
                backgroundColor: (context: ScriptableContext<"bar">): Color | undefined => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) return undefined; // ✅ fixed: return undefined instead of null
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, "rgba(208,154,64,0.2)");
                    gradient.addColorStop(1, "rgba(208,154,64,1)");
                    return gradient;
                },
                borderRadius: 8,
            },
        ],
    };



    return (
        <div className="bg-[#FAF5EC] shadow shadow-[#00000033] py-5 px-7 h-[438px] rounded-[12px] ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#10101E]">
                    Reviews Submitted Per Week
                </h2>
            </div>
            <Bar data={weeklyData} options={options} />
        </div>
    );
};

export default WeekChart;
