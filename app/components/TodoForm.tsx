import {useEffect, useRef} from 'react';
import {Form, useActionData, useTransition} from '@remix-run/react';

import type {ActionData} from '~/routes';

export default function TodoForm() {
  const actionData = useActionData() as ActionData;
  const transition = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const isAdding =
    transition.state === 'submitting' &&
    transition.submission.formData.get('_action') === 'create';

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
        <label htmlFor="title">Add your item</label>
        <div>
          <input
            ref={titleRef}
            name="title"
            type="text"
            aria-invalid={actionData?.errors?.title ? true : undefined}
          />
          <button type="submit" name="_action" value="create">
            Save
          </button>
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
