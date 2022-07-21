import {useEffect, useRef} from 'react';
import {Form, useActionData, useTransition} from '@remix-run/react';

import type {ActionData} from '~/routes/add';

export default function TodoForm() {
  const actionData = useActionData() as ActionData;
  const transition = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const isAdding = transition.state === 'submitting';

  useEffect(() => {
    titleRef.current?.focus();
  }, [titleRef.current]);

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
    }
  }, [isAdding]);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div>
      <Form ref={formRef} method="post">
        <label htmlFor="title">Create Todo item</label>
        <div>
          <input
            ref={titleRef}
            name="title"
            placeholder="Type your todo item"
            type="text"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            className="border-1 my-2 h-10 rounded-md border border-indigo-200 px-2"
          />
          <button className="mx-4 rounded-md bg-indigo-200 p-2">Save</button>
          {actionData?.errors?.title && (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.title}
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}
