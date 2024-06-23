import Link from 'next/link';

type NavigationDrawerContentProps = {
  name: string;
  title: string;
  url: string; // Accept url as prop
};

const NavigationDrawerContent = ({ name, url }: NavigationDrawerContentProps) => {
  return (
    <Link href={url}>
      <span className="block py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
        {name}
      </span>
    </Link>
  );
};

export { NavigationDrawerContent };
