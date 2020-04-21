import db from '../../database';

export const viewItem = ({ empno, itemanalysis_id, item_number }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM item WHERE empno = ? AND itemanalysis_id = ? AND item_number = ?;`;

    const values = [empno, itemanalysis_id, item_number];

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

export const viewAllItem = ({ empno, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM item WHERE empno = ? AND itemanalysis_id = ?;`;

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

export const editItem = ({ empno, itemanalysis_id, item_number, frequency_of_error }) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO item (empno, itemanalysis_id, item_number, frequency_of_error) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE frequency_of_error = ?`;

    const values = [empno, itemanalysis_id, item_number, frequency_of_error, frequency_of_error];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};