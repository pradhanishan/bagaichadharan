const dummyNavigationData = [
  {
    sectionName: 'Access',
    items: [
      {
        title: 'Browse',
        contents: ['Home'],
        urls: ['/dashboard'], // Define URLs for navigation items
      },
    ],
  },
  {
    sectionName: 'Record',
    items: [
      {
        title: 'Bill',
        contents: ['Create'],
        urls: ['/dashboard/bill/create'], // Define URLs for navigation items
      },
      {
        title: 'Stock',
        contents: ['Create'],
        urls: ['/dashboard/stock/create'], // Define URLs for navigation items
      },
    ],
  },
];

export default dummyNavigationData;
