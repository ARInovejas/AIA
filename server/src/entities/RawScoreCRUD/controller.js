import db from '../../database';

export const viewAllRawScore = ({ empno, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM rawscore WHERE empno = ? AND itemanalysis_id = ?;`;

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


export const editRawScore = ({ empno, itemanalysis_id, rawscore_id, rawscore_number, students_with_rawscore, product }) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE rawscore SET
      rawscore_number = ?,
      students_with_rawscore = ?,
      product = ?
    WHERE
      empno = ? AND itemanalysis_id = ? AND rawscore_id = ?;`;

    const values = [rawscore_number, students_with_rawscore, product, empno, itemanalysis_id, rawscore_id];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const deleteRawScore = ({ empno, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM foe WHERE empno = ? AND itemanalysis_id = ?;`;

    const values = [empno, itemanalysis_id];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};
