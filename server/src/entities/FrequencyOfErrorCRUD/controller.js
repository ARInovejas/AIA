import db from '../../database';

export const viewAllFOE = ({ empno, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM foe WHERE empno = ? AND itemanalysis_id = ?;`;

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


export const editFOE = ({ empno, itemanalysis_id, item_number, frequency_of_error }) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE foe SET
      frequency_of_error = ?
    WHERE
      empno = ? AND itemanalysis_id = ? AND item_number = ?;`;

    const values = [frequency_of_error, empno, itemanalysis_id, item_number];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const deleteFOE = ({ empno, itemanalysis_id }) => {
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
