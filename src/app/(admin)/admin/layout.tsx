import Sidebar from "@/app/components/sidebar/Sidebar";
import AdminNavbar from "@/app/components/navbar/AdminNavbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {/* Sidebar */}
                <Sidebar />

                {/* Main Section */}
                <div className="ml-[323px] flex flex-col h-screen">
                    {/* Navbar */}
                    <AdminNavbar />

                    {/* Page Content */}
                    <main className="flex-1 pt-9 px-10 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
