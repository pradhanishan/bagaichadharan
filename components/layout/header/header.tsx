// header.tsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard Header</h1>
      </div>
    </header>
  );
};

export { Header };
