"use client";
import React, { useState } from "react";

const ReportFrom = () => {
    const [reportName, setReportName] = useState<string>("");
    const [reportType, setReportType] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>("");

    // CSV Export
    const handleExportCSV = () => {
        const csvContent = `Report Name,Type,Date\n${reportName},${reportType},${selectedDate}`;
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // PDF Export
    const handleExportPDF = () => {
        const content = `
      Report Name: ${reportName}\n
      Type: ${reportType}\n
      Date: ${selectedDate}
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

    return (
        <div className="mt-9">
            <div className="bg-[#FAF5EC] shadow shadow-[#00000033] py-5 px-6 rounded-[12px]">
                <h1 className="text-xl font-normal">Generate Reports</h1>
                <div className="mt-5">
                    <form action="" className="space-y-3">
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
                                <option value="basic">User Growth</option>
                                <option value="premium">Reviews</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div className="flex flex-col">
                            <label className="text-lg font-thin" htmlFor="date">
                                Date
                            </label>
                            <div className="relative mt-3">
                                <input
                                    type="date"
                                    id="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full border border-[#989DA3] rounded-[7px] py-3 px-4 pr-10 focus:outline-none hover:outline-none"
                                />
                            </div>
                        </div>

                        {/* Export Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleExportCSV}
                                className=" border border-[#d19b40]  px-4 py-2 rounded-lg cursor-pointer  "
                            >
                                Export CSV
                            </button>
                            <button
                                type="button"
                                onClick={handleExportPDF}
                                className="border border-[#d19b40]  px-4 py-2 rounded-lg cursor-pointer "
                            >
                                Export PDF
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportFrom;
