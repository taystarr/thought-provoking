const User = require('../models/User');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({ path: 'thoughts', select: '-__v' })
            // .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'no user found with this id' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'no user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },
    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'no user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, 
            { $push: { friends: params.friendId}},
            { new: true })
                // .populate({ path: 'friends', select: ('-__v')})
                // .select('-__v')
                .then(dbUserData => {
                    if(!dbUserData) {
                        res.status(404).json({ message: 'no user found with this id' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.json(err));
    },
    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, 
            { $pull: { friends: params.friendId }}, 
            { new: true })
                .then(dbUserData => {
                    if(!dbUserData) {
                        res.status(404).json({ message: 'no user found with this id' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;