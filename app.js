/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");
const { convertStrNums } = require("./utils");
const stats = require("./stats");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  console.log("req.query.nums=", req.query.nums);
  const nums = convertStrNums(req.query.nums);
  const mean = stats.findMean(nums);
  console.log("nums =", nums, "mean =", mean);
  // debugger;

  return res.json({ operation: "mean", value: mean });
});

/** Finds median of nums in qs: returns {operation: "median", result } */

/** Finds mode of nums in qs: returns {operation: "mean", result } */

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
