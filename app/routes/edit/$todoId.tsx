import {json, redirect} from '@remix-run/node';
import type {ActionFunction, LoaderFunction} from '@remix-run/node';
import {getNote, updateNote} from '~/models/note.server';
import {Form, useActionData, useLoaderData} from '@remix-run/react';
import {useEffect, useRef, useState} from 'react';

export type ActionData = {
  errors?: {
    title: string;
  };
};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const {_action, ...values} = Object.fromEntries(formData);

  const {title} = values;

  const id = values.id as string;

  if (typeof title !== 'string' || title.length === 0) {
    return json<ActionData>(
      {errors: {title: 'Title is required'}},
      {status: 400},
    );
  }

  await updateNote(id, {title});
  return redirect('/');
};

export const loader: LoaderFunction = async ({params}) => {
  const todoId = params.todoId as string;

  return getNote(todoId);
};

const EditTodo = () => {
  const actionData = useActionData() as ActionData;
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const data = useLoaderData();

  const [updatedTitle, setUpdatedTitle] = useState(data.title);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div className="center flex w-full flex-col items-center p-4">
      <div>
        <Form ref={formRef} method="post">
          <label htmlFor="title">Update Todo item</label>
          <div>
            <input type="hidden" name="id" value={data.id} />
            <input
              ref={titleRef}
              name="title"
              value={updatedTitle}
              onChange={e => setUpdatedTitle(e.target.value)}
              placeholder="Type your todo item"
              type="text"
              aria-invalid={actionData?.errors?.title ? true : undefined}
              className="border-1 my-2 h-10 rounded-md border border-indigo-200 px-2"
            />
            <button className="mx-4 rounded-md bg-indigo-200 p-2">
              Update
            </button>
            {actionData?.errors?.title && (
              <div className="pt-1 text-red-700" id="title-error">
                {actionData.errors.title}
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditTodo;
