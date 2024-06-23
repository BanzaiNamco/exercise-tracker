import { User } from '../model/userSchema.js';
import { Exercise } from '../model/exerciseSchema.js';


const controller = {
    addUser: async (req, res) => {
        const username = req.body.username;
        
        try {
            const newUser = new User({ username });
            await newUser.save();
            res.send({
                username: newUser.username,
                _id: newUser._id.toString()
            })
        } catch (error) {
            res.send({ error: 'Error saving user' });
        }

    },
    getUsers: async (req, res) => {

        try {
            const users = await User.find({});
            if (users.length > 0) {
                res.send(users.map(user => ({ username: user.username, _id: user._id.toString() })));
            } else {
                res.send({});
            }
        } catch (error) {
            res.send({ error: 'Error fetching users' });
        }
    },
    addExercise: async (req, res) => {
        const description = req.body.description;
        const duration = req.body.duration;
        const date = req.body.date? new Date(req.body.date): new Date();
        const id = req.params._id;
        try {
            const user = await User.findById(id);
            const exercise = new Exercise({
                username: user.username,
                description: description,
                duration: duration,
                date: date,
                userId: user._id
            });

            await exercise.save();
            res.send({
                username: exercise.username,
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString(),
                _id: exercise.userId.toString()
            })

        } catch (error) {
            res.send({ error: 'Error saving exercise' });
        }
    },
    getLogs: async (req, res) => {
        const id = req.params._id;
        const user = await User.findById(id);
        const username = user.username;
        const from = req.query.from? new Date(req.query.from): new Date(0);
        const to = req.query.to? new Date(req.query.to): new Date();
        const limit = req.query.limit? parseInt(req.query.limit): 0;

        let logs = await Exercise.find({ userId: id, date: { $gte: from, $lte: to } }).limit(limit);

        let newlogs = logs.map(log => ({
            description: log.description,
            duration: log.duration,
            date: log.date.toDateString()
        }));

        res.send({
            _id: id,
            username: username,
            count: newlogs.length,
            log: newlogs
        });

    },

};

export default controller;