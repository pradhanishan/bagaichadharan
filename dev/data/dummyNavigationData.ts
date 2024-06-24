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
        contents: ['Create', 'Recent Bills'],
        urls: ['/dashboard/bill/create', '/dashboard/bill/view'], // Define URLs for navigation items
      },
      {
        title: 'Expense',
        contents: ['Create'],
        urls: ['/dashboard/expense/create'], // Define URLs for navigation items
      },
    ],
  },
];

export default dummyNavigationData;
