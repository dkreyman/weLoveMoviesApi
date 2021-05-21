const { PORT = 5000 } = process.env;

const path = require("path");
const knex = require("./db/connection");
const app = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/app"
));
const listener = () => console.log(`Listening on Port ${PORT}!`);
// app.listen(PORT, listener);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
