import { NavigationDrawerContent } from './navigation-drawer-content';
import { NavigationDrawerTitle } from './navigation-drawer-title';

type NavigationDrawerItemProps = {
  title: string;
  contents: string[];
  urls: string[]; // Add urls as prop
};

const NavigationDrawerItem = ({ title, contents, urls }: NavigationDrawerItemProps) => {
  return (
    <div className="pl-2">
      <div className="border-l-4 pl-4 mb-4">
        <NavigationDrawerTitle name={title} />
        <div className="pl-4 mt-2">
          {contents.map((content, index) => (
            <NavigationDrawerContent
              key={`content-${index}`}
              name={content}
              title={title}
              url={urls[index]} // Pass the corresponding URL
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { NavigationDrawerItem };
