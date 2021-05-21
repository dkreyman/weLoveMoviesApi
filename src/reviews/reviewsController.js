const service = require("./reviewsServices");
async function list(req, res, next) {
  try {
    const result = await service.list(req.params.movieId);
    res.json({ data: result });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: "Error finding the reviews" });
  }
}

async function reviewExists(req, res, next) {
  try {
    const { reviewId } = req.params;
    const result = await service.read(reviewId);
    if (result.length) {
      res.locals.review = result;
      return next();
    }
    next({ status: 404, message: "Review cannot be found" });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: "Something went wrong looking for review" });
  }
}

async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: req.params.reviewId,
  };
  try {
    const result = await service.update(updatedReview);
    res.json({ data: result });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: "Something went wrong updating review" });
  }
}

async function destroy(req, res, next) {
  try {
    const result = await service.destroy(req.params.reviewId);
    res.status(204).json({ data: result });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: "Something went wrong deleting review" });
  }
}

module.exports = {
  list,
  update: [reviewExists, update],
  destroy: [reviewExists, destroy],
};
