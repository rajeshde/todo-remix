import {Note} from '@prisma/client';
import {Form} from '@remix-run/react';

export default function TodoItem({item}: {item: Note}) {
  return (
    <>
      {item.title}
      <Form method="post">
        <input type="hidden" name="id" value={item.id} />
        <button name="_action" value="delete">
          Delete
        </button>
      </Form>
    </>
  );
}
