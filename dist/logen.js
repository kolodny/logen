var logen = function Logen(obj) {
  if (!(this instanceof Logen)) return new Logen(obj);
  this.wrapped = obj;
};


logen.each = function(obj, iteratee) {
  if (logen.isGenerator(iteratee)) {
    return function *each() {
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
    }
  } else {
    var i, length = obj.length, result;
    if (length === +length) {
      for (i = 0; i < length && result !== false; i++) {
        result = iteratee(obj[i], i, obj);
      }
    } else {
      for (i in obj) {
        if (result === false) { break; }
        result = iteratee(obj[i], i, obj);
      }
    }
  }
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = logen;
} else if (typeof define === 'function' && define.amd) {
  define(logen);
} else {
  this.logen = logen;
}


logen.isGenerator = function isGenerator(fn) {
  return fn.constructor.name === 'GeneratorFunction';
};


//# sourceMappingURL=logen.js.map