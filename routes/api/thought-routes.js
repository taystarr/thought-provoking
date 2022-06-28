const router = require("express").Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

router
    .route("/")
    .get(getAllThought);

router
    .route("/:id")
    .get(getThoughtById)
    .post(createThought)
    .put(updateThought);

router
    .route("/:thoughtId/:userId")
    .delete(deleteThought);

router
    .route("/:thoughtId/reactions")
    .post(addReaction);

router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;