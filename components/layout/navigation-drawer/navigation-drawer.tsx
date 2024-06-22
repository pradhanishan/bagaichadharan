import { NavigationDrawerItem } from '@/components/layout/navigation-drawer/navigation-drawer-item';
import dummyNavigationData from '@/dev/data/dummyNavigationData';

const NavigationDrawer = () => {
  return (
    <div className="w-full md:w-[300px] border-r border-gray-200 dark:border-gray-700 overflow-y-auto pt-16 pl-4 flex flex-col items-start bg-white dark:bg-gray-800 shadow-lg">
      {dummyNavigationData.map((section, index) => (
        <div key={`section-${index}`} className="mb-8">
          <div className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">{section.sectionName}</div>
          {section.items.map((item, itemIndex) => (
            <NavigationDrawerItem key={`item-${index}-${itemIndex}`} title={item.title} contents={item.contents} />
          ))}
        </div>
      ))}
    </div>
  );
};

export { NavigationDrawer };
