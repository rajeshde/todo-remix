import {Note} from '@prisma/client';
import {Form} from '@remix-run/react';

export default function TodoItem({item}: {item: Note}) {
  return (
    <li>
      <Form method="post">
        <span>{item.title}</span>
        <input type="hidden" name="id" value={item.id} />
        <button name="_action" value="delete">
          X
        </button>
      </Form>
    </li>
  );
}
