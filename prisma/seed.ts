import {PrismaClient} from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getNotes().map(note => {
      return db.note.create({data: note});
    }),
  );
}

seed();

function getNotes(): Array<{title: string; isComplete: boolean}> {
  return [
    {title: 'Morning walk', isComplete: true},
    {title: 'Breakfast', isComplete: false},
    {title: 'Buy groceries', isComplete: false},
    {title: 'Meeting', isComplete: false},
    {title: 'Lunch', isComplete: false},
  ];
}
