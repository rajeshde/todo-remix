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

function getNotes(): Array<{title: string}> {
  return [
    {title: 'Walk 90 minutes'},
    {title: 'Buy newspaper'},
    {title: 'Do Yoga'},
    {title: 'Have breakfast'},
    {title: 'Go to work'},
  ];
}
