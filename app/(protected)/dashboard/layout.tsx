export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <div className="w-1/4 bg-gray-200 overflow-y-auto">{/* Your navigation content goes here */}</div>

      {/* Right Content Area */}
      <div className="w-3/4 bg-white overflow-y-auto">
        {/* Main content area */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
