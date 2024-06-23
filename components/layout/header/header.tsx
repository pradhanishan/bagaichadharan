// header.tsx
import { logout } from '@/actions';
import { Button } from '@/components/ui/button';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard Header</h1>
        <form action={logout}>
          <Button type="submit" variant="secondary">
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
};

export { Header };
