import type {Note} from '@prisma/client';

import {db} from '~/utils/db.server';

export type {Note} from '@prisma/client';

export function getNotes() {
  return db.note.findMany();
}

export function createNote({title}: Pick<Note, 'title'>) {
  return db.note.create({
    data: {title},
  });
}

export function deleteNote({id}: Pick<Note, 'id'>) {
  return db.note.deleteMany({
    where: {id},
  });
}
