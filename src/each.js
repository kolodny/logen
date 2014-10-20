logen.each = function(obj, iteratee) {
  //! start compile {"name": "each", "maybeGenerator": "iteratee"}
  var i, length = obj.length, result;
  if (length === +length) {
    for (i = 0; i < length && result !== false; i++) {
      result = yield *iteratee(obj[i], i, obj);
    }
  } else {
    for (i in obj) {
      if (result === false) { break; }
      result = yield *iteratee(obj[i], i, obj);
    }
  }
  //! end compile
};
