import type {Note} from '@prisma/client';
import {useLoaderData} from '@remix-run/react';

import TodoItem from './TodoItem';

type LoaderData = {notes: Array<Note>};

export default function TodoList() {
  const data = useLoaderData<LoaderData>();
  const {notes} = data;

  if (!notes?.length) {
    return <h4>No todo items yet</h4>;
  }

  return (
    <ul>
      {notes.map((note, index) => (
        <TodoItem key={`${note}-${index}`} item={note} />
      ))}
    </ul>
  );
}
