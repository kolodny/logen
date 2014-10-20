var logen = function Logen(obj) {
  if (!(this instanceof Logen)) return new Logen(obj);
  this.wrapped = obj;
};
