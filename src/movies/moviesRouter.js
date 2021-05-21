const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("./moviesController");
const reviewsRouter = require("../reviews/reviewsRouter");
const reviewsController = require("../reviews/reviewsController");

router.use("/:movieId/reviews", reviewsController.list);
router.route("/:movieId/theaters").get(controller.read_theaters);
router.route("/:movieId").get(controller.read);
router.route("/").get(controller.list);
module.exports = router;
