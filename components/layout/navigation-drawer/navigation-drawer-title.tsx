type NavigationDrawerTitleProps = {
  name: string;
};

const NavigationDrawerTitle = ({ name }: NavigationDrawerTitleProps) => {
  return <div className="text-lg font-semibold text-gray-900 dark:text-gray-200">{name}</div>;
};

export { NavigationDrawerTitle };
