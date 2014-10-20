if (typeof module !== 'undefined' && module.exports) {
  module.exports = logen;
} else if (typeof define === 'function' && define.amd) {
  define(logen);
} else {
  this.logen = logen;
}
