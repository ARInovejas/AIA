import mysql from 'mysql';

const db = mysql.createPool({
  host: 'localhost',
  user: 'aia',
  password: 'aia',
  database: 'aia',
  dateStrings: true
});

db.getConnection(err => {
  if (err) {
    console.log('Error in connecting to database');
    console.log(err);
  } else {
    console.log('Success in connecting to database');
  }
});

db.query('USE aia');

export default db;
