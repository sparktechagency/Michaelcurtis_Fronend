"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAdminActivityQuery } from "@/app/api/admin/adminApi";

// ✅ Default colors
const defaultColors: string[] = [
    "#2E86FF",
    "#D83EF2",
    "#34D058",
    "#E74C3C",
    "#E67E22",
    "#2AA8A8",
];

// ✅ Type for each chart item (with index signature for Recharts)
export interface ChartItem {
    name: string;
    value: number;
    [key: string]: number | string; // required for Recharts ChartDataInput
}

// ✅ Type for API response
interface AdminActivityResponse {
    reviewsDistribution: ChartItem[];
    // Add other fields if your API returns more
}

const ReviewChart: React.FC = () => {
    // ✅ Fetch chart data from API
    const { data, isLoading, isError } = useAdminActivityQuery({}) as {
        data?: AdminActivityResponse;
        isLoading: boolean;
        isError: boolean;
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading chart</p>;

    const chartData: ChartItem[] = data?.reviewsDistribution || [];

    return (
        <div className="bg-[#FAF5EC] shadow shadow-[#00000033] rounded-[12px] h-[438px] py-5 px-8">
            <h2 className="text-xl font-semibold mb-4">Reviews Distribution</h2>

            <div className="flex h-[350px] w-full">
                <div className="w-full flex-1 flex justify-center items-center">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                                label={({ value }) => value} // show value on slices
                                labelLine={false} // hide connecting lines
                            >
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={defaultColors[index % defaultColors.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-2 mt-4">
                    {chartData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-11 h-3 rounded"
                                style={{ backgroundColor: defaultColors[index % defaultColors.length] }}
                            ></div>
                            <span className="text-sm">
                                {item.name} ({item.value})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewChart;
