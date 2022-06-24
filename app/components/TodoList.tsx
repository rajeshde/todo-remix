import type {LoaderFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import type {Note} from '@prisma/client';

import {db} from '~/utils/db.server';
import TodoItem from './TodoItem';
import {getNotes} from '~/models/note.server';

export default function TodoList({notes}: {notes: Array<Note>}) {
  return (
    <ul>
      {notes?.map((note, index) => (
        <li key={`${note}-${index}`}>
          <TodoItem item={note} />
        </li>
      ))}
    </ul>
  );
}
