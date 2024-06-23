'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

function DashboardBreadcrumb() {
  // Get the current pathname using usePathname hook
  const pathname = usePathname();

  // Split path into segments
  const segments = pathname.split('/').filter((segment) => segment !== '');

  // Generate breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const urlSegment = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;

    if (isLast) {
      return (
        <Fragment key={index}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{segment}</BreadcrumbPage>
          </BreadcrumbItem>
        </Fragment>
      );
    } else {
      return (
        <Fragment key={index}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={urlSegment}>{segment}</BreadcrumbLink>
          </BreadcrumbItem>
        </Fragment>
      );
    }
  });

  // Render the breadcrumb component
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/">...</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { DashboardBreadcrumb };
