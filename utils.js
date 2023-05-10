"use strict";

const { BadRequestError } = require("./expressError");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  let converted = [];
  if (!(strNums.length)) {
    throw new BadRequestError("Numbers are required");
  }

  for (let val of strNums.split(',')) {
    if (isNaN(Number(val))) {
      throw new BadRequestError(`${val} is not a number`);
    } else {
      converted.push(Number(val));
    }
  }
  return converted;
}

module.exports = { convertStrNums };
