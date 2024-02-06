import React from 'react';

import {
  Datagrid, List, TextField, BooleanField,
} from 'react-admin';

// const searchFilter = [<SearchInput source="q" alwaysOn />];

export default function AdminSpecialistsList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="surname" />
        <TextField source="createdAt" />
        <TextField source="formatOfWork" />
        <BooleanField source="isActive" />
      </Datagrid>
    </List>
  );
}
