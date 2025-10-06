"use client";
import { useLazyReportDownloadQuery, useRecentReportQuery } from "@/app/api/admin/reportApi";
import React from "react";

import axios from "axios"
export interface ReportListType {
    id: number,
    report_name: string;
    type: string;
    format: string;
    file_path: string;
    generated_by: string;
    created_at: string;
    updated_at: string
}


export default function ReportList() {
    const { data } = useRecentReportQuery([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const reportData: ReportListType[] = data?.data?.data || [];

    const handleDownload = async (id: number) => {
        try {
            const res = await axios.get(
                `${baseUrl}admin/reports-analytics/download/${id}`,
                {
                    responseType: "blob",
                    withCredentials: true, // ✅ send cookies automatically
                }
            );

            console.log(baseUrl)

            const blobUrl = window.URL.createObjectURL(new Blob([res.data]));

            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", `report-${id}.pdf`);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };




    return (
        <div className="bg-[#faf6f0] p-6 rounded-lg shadow-sm h-[655px] overflow-y-auto ">
            <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="pb-2 font-medium text-gray-600">Report Name</th>
                            <th className="pb-2 font-medium text-gray-600">Type</th>
                            <th className="pb-2 font-medium text-gray-600">Date</th>
                            <th className="pb-2 font-medium text-gray-600">Format</th>
                            <th className="pb-2 font-medium text-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((report, idx) => (
                            <React.Fragment key={idx}>
                                <tr className="text-gray-800">
                                    <td className="py-3">{report.report_name}</td>
                                    <td>{report.type}</td>
                                    <td>{new Date(report.created_at).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })}</td>

                                    <td>{report.format}</td>
                                    <td  >
                                        <p

                                            onClick={() => { handleDownload(report?.id) }}

                                            className="text-[#7772C8] hover:underline font-medium cursor-pointer "
                                        >
                                            Download
                                        </p>
                                    </td>
                                </tr>
                                {idx !== reportData.length - 1 && (
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="border-b border-gray-200"></div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
