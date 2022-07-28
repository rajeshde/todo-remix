import {useRef} from 'react';
import type {Note} from '@prisma/client';
import {Form, Link} from '@remix-run/react';

export default function TodoItem({item}: {item: Note}) {
  const ref = useRef<HTMLFormElement>(null);

  const handleOnChange = () => {
    ref.current?.submit();
  };

  return (
    <li className="border-1 my-2 rounded-md border border-indigo-200">
      <Form ref={ref} method="post">
        <input type="hidden" name="item" value={JSON.stringify(item)} />
        <div className="flex h-10 items-center">
          <div className="flex-auto">
            <input
              type="hidden"
              name="_action"
              value={item.isCompleted ? 'uncheck' : 'complete'}
            />
            <input
              type="checkbox"
              name="_action"
              value={item.isCompleted ? 'uncheck' : 'complete'}
              checked={item.isCompleted}
              onChange={handleOnChange}
              className="mx-2 cursor-pointer"
            />
            <span
              className={`${
                item.isCompleted ? 'line-through' : 'no-underline'
              }`}
            >
              {item.title}
            </span>
          </div>
          <Link
            to={`/edit/${item.id}`}
            className="px-4 py-3 text-base font-medium text-blue-700"
          >
            Edit
          </Link>
          <button
            name="_action"
            value="delete"
            className="mx-2 flex-none text-red-400"
          >
            Delete
          </button>
        </div>
      </Form>
    </li>
  );
}
