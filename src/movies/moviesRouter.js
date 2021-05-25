const express = require("express");
const router = express.Router();
const controller = require("./moviesController");
const reviewsRouter = require("../reviews/reviewsRouter");
const reviewsController = require("../reviews/reviewsController");
const { methodNotAllowed } = require("../errors/methodNotAllowed");

router.use("/:movieId/reviews", reviewsRouter);
router
  .route("/:movieId/theaters")
  .get(controller.read_theaters)
  .all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);
module.exports = router;
