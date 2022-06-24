import type {ActionFunction} from '@remix-run/node';
import {json, redirect} from '@remix-run/node';
import {Form, useActionData} from '@remix-run/react';
import {useEffect} from 'react';
import {createNote} from '~/models/note.server';

export default function TodoForm() {
  return (
    <div>
      <Form method="post">
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
