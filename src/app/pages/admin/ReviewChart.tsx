"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// ✅ Type for each chart item
export interface DataItem {
    name: string;
    value: number;
    [key: string]: string | number;
}

// ✅ Props type for the component
export interface ReviewChartProps {
    data?: DataItem[];   // Chart data (optional, defaults provided)
    colors?: string[];   // Colors array (optional, defaults provided)
}

// ✅ Default data
const defaultData: DataItem[] = [
    { name: "Auto", value: 25 },
    { name: "Health", value: 15 },
    { name: "Life", value: 12 },
    { name: "Home", value: 14 },
    { name: "Renters", value: 20 },
    { name: "Car", value: 14 },
];

// ✅ Default colors
const defaultColors: string[] = [
    "#2E86FF",
    "#D83EF2",
    "#34D058",
    "#E74C3C",
    "#E67E22",
    "#2AA8A8",
];

const ReviewChart: React.FC<ReviewChartProps> = ({
    data = defaultData,
    colors = defaultColors,
}) => {
    return (
        <div className="bg-[#FAF5EC]  shadow shadow-[#00000033] rounded-[12px] w-[497px] py-5 px-8 h-full    ">
            <h2 className="text-xl font-semibold mb-4">Reviews Distribution</h2>

            {/* Chart */}
            <div className=" flex h-[350px]  " >
                <div className="w-full flex-1 flex justify-center items-center">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-2 mt-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-11 h-3 rounded"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            ></div>
                            <span className="text-sm">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewChart;
