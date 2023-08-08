export const userA = {
  uid: '001',
  user: 'A',
  notes: 'Hello dear...A',
  actionList: [
    {
      sublistId: '542',
      sublistName: 'subList 1',
      sublistItems: [
        {
          sublistItemId: '1245645',
          item: 'item 1',
        },
        {
          sublistItemId: '12385245',
          item: 'item 2',
        },
        {
          sublistItemId: '12395145',
          item: 'item 3',
        },
      ],
    },
    {
      sublistId: '559515',
      sublistName: 'subList 2',
      sublistItems: [
        {
          sublistItemId: '1275345',
          item: 'item 4',
        },
        {
          sublistItemId: '121345',
          item: 'item 5',
        },
        {
          sublistItemId: '123845',
          item: 'item 6',
        },
      ],
    },
  ],
};

export const userB = {
  displayName: 'Engela',
  email: 'lombard.engela@icloud.com',
  createdAt: 'August',
  d2dData: {
    notes: 'Hello dear....',
    listtypes: [
      { typeId: 't001', typeName: 'Once-off (Action)' },
      { typeId: 't002', typeName: 'Follow-Up' },
      { typeId: 't003', typeName: 'Recurring' },
    ],
    lists: [
      { listId: 'l001', listName: 'List 1' },
      { listId: 'l002', listName: 'List 2' },
    ],
    listitems: [
      { listItemId: 'li001', listId: 'l001', typeId: 't001', item: 'Item 1' },
      { listItemId: 'li002', listId: 'l001', typeId: 't001', item: 'Item 2' },
      { listItemId: 'li003', listId: 'l002', typeId: 't002', item: 'Item 3' },
      { listItemId: 'li004', listId: 'l001', typeId: 't003', item: 'Item 4' },
      { listItemId: 'li005', listId: 'l002', typeId: 't003', item: 'Item 5' },
      { listItemId: 'li006', listId: 'l002', typeId: 't001', item: 'Item 6' },
      { listItemId: 'li007', listId: 'l001', typeId: 't003', item: 'Item 7' },
    ],
    listitemsdone: [
      { listItemId: 'li009', listId: 'l002', typeId: 't001', item: 'Item 6' },
      { listItemId: 'li0010', listId: 'l001', typeId: 't003', item: 'Item 7' },
    ],
  },
};
