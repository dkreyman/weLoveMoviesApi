const service = require("./moviesServices");
async function list(req, res, next) {
  try {
    if (req.query.is_showing === true) {
      const result = await service.list();
      res.json({ data: result });
    } else {
      const result = await service.listPlaying();
      res.json({ data: result });
    }
  } catch (err) {
    console.log(err);
    next({ status: 500, message: "Couldn't list movies" });
  }
}

async function read(req, res, next) {
  const id = req.params.movieId;
  try {
    const result = await service.read(id);
    if (result) {
      res.json({ data: result });
    } else {
      next({ status: 404, message: "Couldn't find movie" });
    }
  } catch (err) {
    console.log(err);
    next({ status: 500, message: "Something went wrong looking for movie" });
  }
}

async function read_theaters(req, res, next) {
  const { movieId } = req.params;
  try {
    const result = await service.read_theaters(movieId);
    if (result) {
      res.json({ data: result });
    } else {
      next({ status: 404, message: "Couldn't find theaters for this movie" });
    }
  } catch (err) {
    console.log(err);
    next({
      status: 500,
      message: "Something went wrong looking for theaters for this movie",
    });
  }
}

module.exports = { list, read, read_theaters };
