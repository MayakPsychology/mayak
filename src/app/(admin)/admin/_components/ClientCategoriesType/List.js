import React from 'react';
import { Datagrid, TextField, List, EditButton, DeleteWithConfirmButton } from 'react-admin';

export function ClientCategoryList() {
  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" label="Категорія" />
        <EditButton label="Редагувати" />
        <DeleteWithConfirmButton
          confirmContent="Ви впевнені?"
          confirmTitle="Дана категорія клієнтів буде вилена із усіх спеціалістів\організацій у яких була зазначена."
          confirmColor="warning"
          label="Видалити"
        />
      </Datagrid>
    </List>
  );
}
