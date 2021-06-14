import db from '../../database';

export const viewItemAnalysis = ({ empno, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM itemanalysis WHERE empno = ? AND itemanalysis_id = ?;`;

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

export const viewAllItemAnalysis = ({ empno }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM itemanalysis WHERE empno = ?;`;

    const values = [empno];

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


export const editItemAnalysis = ({ empno, itemanalysis_id, total_rawscore, total_num_of_students, number_of_items, mean, students_above_mean, students_equals_mean, students_below_mean, section }) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE itemanalysis SET
      total_rawscore = ?,
      total_num_of_students = ?,
      number_of_items = ?,
      mean = ?,
      students_above_mean = ?,
      students_equals_mean = ?,
      students_below_mean = ?,
      section = ?
    WHERE
      empno = ? AND itemanalysis_id = ?;`;

    const values = [total_rawscore, total_num_of_students, number_of_items, mean, students_above_mean, students_equals_mean, students_below_mean, section, empno, itemanalysis_id];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const deleteItemAnalysis = ({ empno, itemanalysis_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM itemanalysis WHERE empno = ? AND itemanalysis_id = ?;`;

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
