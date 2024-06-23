import express from 'express';
import cors from 'cors';
import db from './db';
import bodyParser from 'body-parser';
import controller from './controller/controller';

require('dotenv').config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', controller.addUser);
app.get('/api/users', controller.getUsers);
app.post('/api/users/:_id/exercises', controller.addExercise);
app.get('/api/users/:_id/logs', controller.getLogs);

db.connect();

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
