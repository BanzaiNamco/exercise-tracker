import { User } from '../models/userSchema.js';
import { Exercise } from '../models/exerciseSchema.js';


const controller = {
    addUser: (req, res) => {
        const username = req.body.username;
        const newUser = new User({ username });
        newUser.save((err, data) => {
            if (err) {
                res.send({ error: 'Error saving user' });
            } else {
                res.send({
                    username: data.username,
                    _id: data._id
                });
            }
        });

    },
    getUsers: (req, res) => {
        User.find({}, (err, data) => {
            if (err) {
                res.send({ error: 'Error getting users' });
            } else {
                res.send(data.map(user => ({ username: user.username, _id: user._id })));
            }
        });
    },
    addExercise: (req, res) => {
        const description = req.body.description;
        const duration = req.body.duration;
        const date = req.body.date? new Date(req.body.date): new Date();
        const id = req.params._id;

        const username = User.findById(id).username;
        const exercise = new Exercise({
            username: username,
            description,
            duration,
            date,
            _id: id
        });

        exercise.save((err, data) => {
            if (err) {
                res.send({ error: 'Error saving exercise' });
            } else {
                res.send({
                    username: data.username,
                    description: data.description,
                    duration: data.duration,
                    date: data.date,
                    _id: data._id
                });
            }
        });

    },
    getLogs: async (req, res) => {
        const id = req.params._id;
        const username = User.findById(id).username;
        const from = req.query.from? new Date(req.query.from): new Date(0);
        const to = req.query.to? new Date(req.query.to): new Date();
        const limit = req.query.limit? parseInt(req.query.limit): 0;

        const logs = await Exercise.find({ _id: id, date: { $gte: from, $lte: to } }).limit(limit);

        res.send({
            _id: id,
            username: username,
            count: logs.length,
            log: logs
        });

    },

};

module.exports = controller;