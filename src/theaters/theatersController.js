const service = require("./theatersServices");
async function list(req, res, next) {
  try {
    const result = await service.list();
    res.json({ data: result });
  } catch (err) {
    console.log(err);
    next({ status: 500, message: "Something went wrong looking for theaters" });
  }
}

module.exports = {
  list,
};
