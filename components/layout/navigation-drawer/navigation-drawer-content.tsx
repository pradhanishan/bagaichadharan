type NavigationDrawerContentProps = {
  name: string;
};

const NavigationDrawerContent = ({ name }: NavigationDrawerContentProps) => {
  return <div className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{name}</div>;
};

export { NavigationDrawerContent };
