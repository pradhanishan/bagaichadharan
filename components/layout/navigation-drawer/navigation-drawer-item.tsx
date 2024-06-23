import { NavigationDrawerContent } from './navigation-drawer-content';
import { NavigationDrawerTitle } from './navigation-drawer-title';

type NavigationDrawerItemProps = {
  title: string;
  contents: string[];
};

const NavigationDrawerItem = ({ title, contents }: NavigationDrawerItemProps) => {
  return (
    <div className="pl-2">
      <div className="border-l-4 pl-4 mb-4">
        <NavigationDrawerTitle name={title} />
        <div className="pl-6">
          {contents.map((content, index) => (
            <NavigationDrawerContent key={`content-${index}`} name={content} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { NavigationDrawerItem };
