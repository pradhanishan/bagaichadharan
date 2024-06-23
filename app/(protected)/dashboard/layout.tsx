import { DashboardBreadcrumb } from '@/components/layout/dashboard-breadcrumb';
import { Header } from '@/components/layout/header/header';
import { NavigationDrawer } from '@/components/layout/navigation-drawer/navigation-drawer';
import { headers } from 'next/headers';
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const headersList = headers();
  const fullUrl = headersList.get('referer') || '';

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 max-h-screen max-w-screen">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Left Sidebar - Navigation Drawer */}
        <NavigationDrawer />

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Breadcrumb Component */}
          <div className="flex justify-center items-center py-4">
            <DashboardBreadcrumb />
          </div>

          {/* Main Content */}
          <div className="p-4 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
