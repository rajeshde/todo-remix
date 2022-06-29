import type {ActionFunction, LoaderFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useActionData} from '@remix-run/react';

import {createNote, deleteNote, getNotes, Note} from '~/models/note.server';
import TodoForm from '~/components/TodoForm';
import TodoList from '~/components/TodoList';

export type ActionData = {
  errors?: {
    title: string;
  };
};
type LoaderData = {notes: Array<Note>};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const {_action, ...values} = Object.fromEntries(formData);

  switch (_action) {
    case 'create': {
      const {title} = values;

      if (typeof title !== 'string' || title.length === 0) {
        return json<ActionData>(
          {errors: {title: 'Title is required'}},
          {status: 400},
        );
      }

      await createNote({title});
      return null;
    }
    case 'delete': {
      const id = values.id as string;
      await deleteNote({id});
      return null;
    }
  }
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    notes: await getNotes(),
  };
  return json(data);
};

export default function IndexRoute() {
  return (
    <div>
      <TodoForm />
      <TodoList />
    </div>
  );
}
