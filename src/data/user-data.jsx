export const user = {
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

export const org = {
  orgId: '1234',
  orgOwner: 'uid1234',
  createdAt: 'August',
  users: [{ displayName: 'Engela', uid: '1234', notes: 'Hello qwrk' }],
  listTypes: [
    { typeId: 't001', typeName: 'Once-off (Action)' },
    { typeId: 't002', typeName: 'Follow-Up' },
    { typeId: 't003', typeName: 'Recurring' },
  ],
  lists: [
    { listId: 'l001', listName: 'List 1', userOwner: true, ownerId: 'uid' },
    { listId: 'l002', listName: 'List 2', userOwner: false, ownerId: 'uid' },
  ],
  listItems: [
    {
      listItemId: 'li001',
      listId: 'l001',
      typeId: 't001',
      item: 'Item 1',
      active: true,
      completed: false,
    },
    {
      listItemId: 'li002',
      listId: 'l001',
      typeId: 't001',
      item: 'Item 2',
      active: true,
      completed: false,
    },
    {
      listItemId: 'li003',
      listId: 'l002',
      typeId: 't002',
      item: 'Item 3',
      active: true,
      completed: false,
    },
    {
      listItemId: 'li004',
      listId: 'l001',
      typeId: 't003',
      item: 'Item 4',
      active: true,
      completed: false,
    },
  ],
};
