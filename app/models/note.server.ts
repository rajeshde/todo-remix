import type {Note} from '@prisma/client';

import {db} from '~/utils/db.server';

export type {Note} from '@prisma/client';

export function getNotes() {
  return db.note.findMany();
}

export function getNote(id: string) {
  return db.note.findUnique({where: {id}});
}

export function createNote({
  title,
  isCompleted = false,
}: Pick<Note, 'title' | 'isCompleted'>) {
  return db.note.create({
    data: {title, isCompleted},
  });
}

export function deleteNote({id}: Pick<Note, 'id'>) {
  return db.note.deleteMany({
    where: {id},
  });
}

type UpdateData = {
  title?: string;
  isCompleted?: boolean;
};
export function updateNote(id: string, data: UpdateData) {
  return db.note.update({
    where: {id},
    data,
  });
}
