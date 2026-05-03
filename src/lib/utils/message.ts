import { Message } from '@/constants/messages';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { join } from 'path';

async function generateMessage() {
  console.log('Generating messages....');
  const messageList = [];

  for (const message of Object.values(Message)) {
    messageList.push(message);
  }
  const messageObj = Object.fromEntries(messageList.map((k) => [k, '']));

  const tmpFolderPath = join('.', 'tmp');

  if (!existsSync(tmpFolderPath)) {
    mkdirSync(tmpFolderPath);
  }

  writeFile(
    join(tmpFolderPath, 'message.json'),
    JSON.stringify(messageObj),
    (err) => {
      if (err) {
        console.log(err);
        throw new Error('Error when generating messages');
      }
    }
  );

  console.log('Message generated!');
}

generateMessage();
