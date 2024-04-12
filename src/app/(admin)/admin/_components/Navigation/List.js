'use client';

import { Datagrid, EditButton, List, TextField } from 'react-admin';
import React from 'react';

export function NavigationList() {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField label="Назва" source="title" />
        <TextField label="Посилання" source="href" />
        <EditButton label="Редагувати" />
      </Datagrid>
    </List>
  );
}
