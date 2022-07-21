import type {ActionFunction, LoaderFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Link} from '@remix-run/react';

import {deleteNote, getNotes, updateNote} from '~/models/note.server';
import type {Note} from '~/models/note.server';
import TodoList from '~/components/TodoList';

type LoaderData = {notes: Array<Note>};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const {_action, item} = Object.fromEntries(formData);
  const parsedItem = JSON.parse(item);
  const id = parsedItem.id as string;

  console.log('_action', _action);
  switch (_action) {
    case 'update': {
      await updateNote(id, {isCompleted: !parsedItem.isCompleted});
      return null;
    }
    case 'complete': {
      await updateNote(id, {isCompleted: true});
      return null;
    }
    case 'uncheck': {
      await updateNote(id, {isCompleted: false});
      return null;
    }
    case 'delete': {
      await deleteNote({id});
      return null;
    }
    default:
      return null;
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
    <div className="center flex w-full flex-col items-center p-4">
      <Link
        to="/add"
        className="px-4 py-3 text-base font-medium text-blue-700 underline"
      >
        Add Todo
      </Link>
      <div className="w-1/4">
        <TodoList />
      </div>
    </div>
  );
}
