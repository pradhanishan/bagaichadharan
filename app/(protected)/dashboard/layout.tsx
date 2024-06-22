export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <div className="w-1/4 border-r border-gray-200 overflow-y-auto">{/* Your navigation content goes here */}</div>

      {/* Right Content Area */}
      <div className="w-3/4 bg-slate-200/35 overflow-y-auto">
        {/* Main content area */}
        {children}
      </div>
    </div>
  );
}
