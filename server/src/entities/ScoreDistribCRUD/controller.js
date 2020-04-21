import db from '../../database';

export const viewScoreDistrib = ({ empno, itemanalysis_id, rawscore }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM score_distrib WHERE empno = ? AND itemanalysis_id = ? AND rawscore = ?;`;

    const values = [empno, itemanalysis_id, rawscore];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      return resolve(rows[0]);
    });
  });
};

export const viewAllScoreDistrib = ({ empno, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM score_distrib WHERE empno = ? AND itemanalysis_id = ?;`;

    const values = [empno, itemanalysis_id];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      return resolve(rows[0]);
    });
  });
};

export const editScoreDistrib = ({ empno, itemanalysis_id, rawscore, students_with_rawscore }) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO item (empno, itemanalysis_id, rawscore, students_with_rawscore) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE students_with_rawscore = ?`;

    const values = [empno, itemanalysis_id, rawscore, students_with_rawscore, students_with_rawscore];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};