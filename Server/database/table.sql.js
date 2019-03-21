import connection from './connection';

const usersTable = `CREATE TABLE IF NOT EXISTS Users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password VARCHAR(50) NOT NULL
);`;

const messagesTable = `CREATE TABLE IF NOT EXISTS messages(
   id SERIAL PRIMARY KEY,
   createdOn TIMESTAMP DEFAULT NOW(),
   subject TEXT,
   message TEXT,
   parentMessageId INTEGER,
   status VARCHAR(10));`;

const sentTable = `CREATE TABLE IF NOT EXISTS sent(
    senderId INTEGER REFERENCES users(id),
    messageId INTEGER REFERENCES messages(id),
    createdOn TIMESTAMP DEFAULT NOW()
);`;

const inboxTable = `CREATE TABLE IF NOT EXISTS inbox (
    receiverId INTEGER REFERENCES users(id),
    messageId INTEGER REFERENCES messages(id),
    createdOn TIMESTAMP NOT NULL DEFAULT NOW()
);`;

const groupTable = `CREATE TABLE IF NOT EXISTS groups(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);`;

const groupMembersTable = `CREATE TABLE IF NOT EXISTS groupMembers(
    groupId INTEGER REFERENCES groups(id),
    memberId INTEGER REFERENCES users(id)
);`;

const sql = [usersTable, messagesTable, inboxTable, sentTable, groupTable, groupMembersTable];

connection.query(sql.join(''), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Tables created');
  }
});
connection.end();
