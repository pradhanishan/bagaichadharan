import { Header } from '@/components/layout/header/header';
import { NavigationDrawer } from '@/components/layout/navigation-drawer/navigation-drawer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Left Sidebar - Navigation Drawer */}
        <NavigationDrawer />

        {/* Right Content Area */}
        <div className="flex-1 bg-slate-200/35 dark:bg-gray-800 overflow-y-auto">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}