__extends = function(a,b){
  function c() {}
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.base = function(a, c, f) {
      for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
          g[h - 2] = arguments[h];
      return b.prototype[c].apply(a, g)
  }
}
