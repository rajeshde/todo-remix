import {json, redirect} from '@remix-run/node';
import type {ActionFunction} from '@remix-run/node';
import AddTodoForm from '~/components/AddTodoForm';
import {createNote} from '~/models/note.server';

export type ActionData = {
  errors?: {
    title: string;
  };
};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const {_action, ...values} = Object.fromEntries(formData);

  const {title} = values;

  if (typeof title !== 'string' || title.length === 0) {
    return json<ActionData>(
      {errors: {title: 'Title is required'}},
      {status: 400},
    );
  }

  await createNote({title, isCompleted: false});
  return redirect('/');
};

const AddTodo = () => {
  return (
    <div className="center flex w-full flex-col items-center p-4">
      <AddTodoForm />
    </div>
  );
};

export default AddTodo;
