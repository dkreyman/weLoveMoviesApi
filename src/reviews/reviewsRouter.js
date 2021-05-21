const router = require("express").Router();
const controller = require("./reviewsController");

router.route("/:reviewId").put(controller.update).delete(controller.destroy);

module.exports = router;
