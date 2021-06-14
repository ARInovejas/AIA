import db from '../../database';

export const viewTeacher = ({ empno }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT empno, fname, lname, email, position, department, year_level FROM teacher WHERE empno = ?;`;

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

export const viewTeachersByDept = ({ department }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT empno, fname, lname, email, position, department, year_level FROM teacher WHERE department = ?;`;

    const values = [department];

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

export const viewTeachersByDeptAndYearLevel = ({ department, year_level }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT empno, fname, lname, email, position, department, year_level FROM teacher WHERE department = ? AND year_level = ?;`;

    const values = [department, year_level];

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


export const editTeacher = ({ empno, fname, lname, email, position, department, year_level }) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE teacher SET
      fname = ?,
      lname = ?,
      email = ?,
      position = ?,
      department = ?,
      year_level = ?
    WHERE
      empno = ?;`;

    const values = [fname, lname, email, position, department, year_level, empno];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const deleteTeacher = ({ empno }) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM teacher WHERE empno = ?;`;

    const values = [empno];

    db.query(sql, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};
