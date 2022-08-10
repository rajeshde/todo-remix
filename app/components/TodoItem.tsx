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
        <div className="flex h-12 items-center">
          <div className="flex-auto flex-row items-center">
            <input
              type="hidden"
              name="_action"
              value={item.isCompleted ? 'uncheck' : 'complete'}
            />
            <label className="block h-4 leading-4">
              <input
                type="checkbox"
                name="_action"
                value={item.isCompleted ? 'uncheck' : 'complete'}
                checked={item.isCompleted}
                onChange={handleOnChange}
                className="mx-4 h-4 w-4 cursor-pointer align-bottom"
              />
              <span
                className={`${
                  item.isCompleted ? 'line-through' : 'no-underline'
                } hover:cursor-pointer`}
              >
                {item.title}
              </span>
            </label>
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
            className="mx-2 flex-none text-red-600"
          >
            Delete
          </button>
        </div>
      </Form>
    </li>
  );
}
