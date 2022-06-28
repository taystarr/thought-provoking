const Thought = require("../models/Thought");
const User = require("../models/User");

const thoughtController = {
    // get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },
//   get thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.sendStatus(404).json({ message: 'no thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
//   create thought through user
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.id },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'no thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
//   update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true})
      .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.sendStatus(404).json({ message: 'no thought found with this id' });
        return;
      }
      res.json(dbThoughtData);
    });
  },
//   delete thought through user
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .sendStatus(404)
            .json({ message: 'no thought found with this id' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },
//   create reaction through thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .sendStatus(404)
            .json({ message: 'no thought found with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
//   delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  }
};

module.exports = thoughtController;