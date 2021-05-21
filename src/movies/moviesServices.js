const knex = require("../db/connection");
function list() {
  return knex("movies").select("*");
}

function listPlaying() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .groupBy("m.title");
}

function read(id) {
  return knex("movies as m").select("*").where({ "m.movie_id": id }).first();
}

function read_theaters(movieId) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movieId, "mt.is_showing": true });
}

module.exports = { list, listPlaying, read, read_theaters };
