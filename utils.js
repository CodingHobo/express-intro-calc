"use strict";

const { BadRequestError } = require("./expressError");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  let converted = [];

  for (let val of strNums.split(',')) {
    val = Number(val);
    if (val === NaN) {
      throw new BadRequestError(`${val} is not a number`);
    } else {
      converted.push(val);
    }
  }
  return converted;
}

module.exports = { convertStrNums };
