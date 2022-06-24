import {createRef, useEffect} from 'react';
import {Form, useTransition} from '@remix-run/react';

export default function TodoForm() {
  const transition = useTransition();
  const formRef = createRef<HTMLFormElement>();

  const isAdding =
    transition.state === 'submitting' &&
    transition.submission.formData.get('_action') === 'create';

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
    }
  }, [isAdding]);

  return (
    <div>
      <Form ref={formRef} method="post">
        <label>
          Add your item
          <input name="title" type="text" />
        </label>
        <button type="submit" name="_action" value="create">
          Save
        </button>
      </Form>
    </div>
  );
}
