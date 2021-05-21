const knex = require("../db/connection.js");
const reduce = require("../utils/reduce-properties");
let addCritic = reduce("review_id", {
  critic_id: ["critic", "critic_id"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  created_at: ["critic", "created_at"],
  updated_at: ["critic", "updated_at"],
});

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then(addCritic);
}

function read(id) {
  return knex("reviews").select("*").where({ review_id: id });
}

async function readCritic(id) {
  return knex("critics").select("*").where({ critic_id: id }).first();
}

async function combineReview(newReview) {
  const newCritic = await readCritic(newReview.critic_id);
  newReview.critic = newCritic;
  return newReview;
}

async function update(newReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: newReview.review_id })
    .update(newReview, "*")
    .then(() => read(newReview.review_id))
    .then((newReview) => combineReview(newReview[0]));
}

function destroy(id) {
  return knex("reviews").select("*").where({ review_id: id }).del();
}
module.exports = { list, read, update, destroy };
