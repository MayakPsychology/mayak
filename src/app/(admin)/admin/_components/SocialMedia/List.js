'use client';

import { Datagrid, DeleteWithConfirmButton, EditButton, List, TextField } from 'react-admin';
import React from 'react';

export function SocialMediaList() {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField label="Title" source="title" />
        <TextField label="Link" source="link" />
        <EditButton label="Редагувати" />
        <DeleteWithConfirmButton
          confirmContent="Ви впевнені?"
          confirmTitle="Дана соц мережа буде видалена із бази."
          confirmColor="warning"
          label="Видалити"
        />
      </Datagrid>
    </List>
  );
}
