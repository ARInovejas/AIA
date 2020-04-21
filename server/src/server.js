import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import store from 'express-mysql-session';
import router from './router';
import db from './database';

const app = express();
const MySQLStore = store(session);
const sessionStore = new MySQLStore({}, db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use(
  session({
    key: 'aiasp',
    secret: 'aiasp',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    createDatabaseTable: true,
    checkExpirationInterval: 60000,
    expiration: 3600000
  })
);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

app.use(router);

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

export default server;
