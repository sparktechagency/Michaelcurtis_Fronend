"use client";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { toast } from "sonner";

const ReportForm = () => {
    const [reportName, setReportName] = useState<string>("");
    const [reportType, setReportType] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [exportFormat, setExportFormat] = useState<"csv" | "pdf">("csv");

    const handleExportCSV = () => {
        const csvContent = `Report Name,Type,Start Date,End Date\n${reportName},${reportType},${startDate},${endDate}`;
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportPDF = () => {
        const content = `
        Report Name: ${reportName}
        Type: ${reportType}
        Start Date: ${startDate}
        End Date: ${endDate}
                `;
        const blob = new Blob([content], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleGenerateReport = () => {
        try {
            if (exportFormat === "csv") {
                handleExportCSV();
            } else {
                handleExportPDF();
            }
            toast.success(`Report exported as ${exportFormat.toUpperCase()} ✅`);
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = (error.data?.message as string) || "Something went wrong ❌";
            toast.error(message);
        }
    };

    return (
        <div>
            <div className="bg-[#FAF5EC] shadow shadow-[#00000033] py-5 px-6 rounded-[12px]">
                <h1 className="text-xl font-normal">Generate Reports</h1>
                <div className="mt-5">
                    <form className="space-y-3">
                        {/* Report Name */}
                        <div className="flex flex-col">
                            <label className="text-lg font-thin" htmlFor="name">
                                Report Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={reportName}
                                onChange={(e) => setReportName(e.target.value)}
                                className="border border-[#989DA3] rounded-[7px] hover:outline-0 focus:outline-0 mt-3 py-3 px-4"
                            />
                        </div>

                        {/* Type */}
                        <div className="flex flex-col">
                            <label className="text-lg font-thin" htmlFor="type">
                                Type
                            </label>
                            <select
                                id="type"
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="border border-[#989DA3] rounded-[7px] mt-3 py-3 px-4 focus:outline-none hover:outline-none"
                            >
                                <option value="">Top Providers by Reviews</option>
                                <option value="user-growth">User Growth</option>
                                <option value="reviews">Reviews</option>
                            </select>
                        </div>

                        {/* Start Date */}
                        <div className="flex flex-col">
                            <label className="text-lg font-thin" htmlFor="start-date">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border border-[#989DA3] rounded-[7px] py-3 px-4 focus:outline-none hover:outline-none mt-3"
                            />
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col">
                            <label className="text-lg font-thin" htmlFor="end-date">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border border-[#989DA3] rounded-[7px] py-3 px-4 focus:outline-none hover:outline-none mt-3"
                            />
                        </div>

                        {/* Export Format Dropdown */}
                        <div className="flex flex-col">
                            <label className="text-lg font-thin" htmlFor="format">
                                Export Format
                            </label>
                            <select
                                id="format"
                                value={exportFormat}
                                onChange={(e) => setExportFormat(e.target.value as "csv" | "pdf")}
                                className="border border-[#989DA3] rounded-[7px] mt-3 py-3 px-4 focus:outline-none hover:outline-none"
                            >
                                <option value="csv">CSV</option>
                                <option value="pdf">PDF</option>
                            </select>
                        </div>

                        {/* Generate Button */}
                        <div className="pt-4">
                            <button
                                type="button"
                                onClick={handleGenerateReport}
                                className="border border-[#d19b40] px-4 py-2 rounded-lg cursor-pointer"
                            >
                                Generate Report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportForm;
