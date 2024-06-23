import Link from 'next/link';

type NavigationDrawerContentProps = {
  name: string;
  title: string;
};

const NavigationDrawerContent = ({ name, title }: NavigationDrawerContentProps) => {
  // Function to generate the route based on the title and name
  const generateRoute = (title: string, name: string) => {
    return `/dashboard/${title.toLowerCase().replace(/\s+/g, '-')}/${name.toLowerCase().replace(/\s+/g, '-')}`;
  };

  // Generate the route based on the title and name
  const route = generateRoute(title, name);

  return (
    <Link href={route}>
      <span className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{name}</span>
    </Link>
  );
};

export { NavigationDrawerContent };
