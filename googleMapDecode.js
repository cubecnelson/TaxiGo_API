
function decodePath(a) {
  'use strict';
  var _ = {};
  var zb = function(a) {
    this.message = a;
    this.name = "InvalidValueError";
    this.stack = Error().stack
  };
  _.Ab = function(a, b) {
    var c = "";
    if (null != b) {
      if (!(b instanceof zb)) return b;
      c = ": " + b.message
    }
    return new zb(a + c)
  };
  _.Ib = function(a, b) {
    return function(c) {
      if (a(c)) return c;
      throw _.Ab(b || "" + c);
    }
  };
  _.D = function(a) {
    return "number" == typeof a
  };
  _.pc = _.Ib(_.D, "not a number");
  _.Db = function(a, b) {
    return function(c) {
      if (!c || !_.Qa(c)) throw _.Ab("not an Object");
      var d = {},
        e;
      for (e in c)
        if (d[e] = c[e], !b && !a[e]) throw _.Ab("unknown property " + e);
      for (e in a) try {
        var f = a[e](d[e]);
        if (_.B(f) || Object.prototype.hasOwnProperty.call(c, e)) d[e] = a[e](d[e])
      } catch (g) {
        throw _.Ab("in property " + e, g);
      }
      return d
    }
  };
  var Mb = _.Db({
    lat: _.pc,
    lng: _.pc
  }, !0);
  _.Ia = function(a, b, c) {
    null != b && (a = Math.max(a, b));
    null != c && (a = Math.min(a, c));
    return a;
  };
  _.Ja = function(a, b, c) {
    c = c - b;
    return ((a - b) % c + c) % c + b;
  };
  _.u = function(a) {
    return a ? a.length : 0;
  };
  _.K = function(a, b, c) {
    if (a && (a.lat || a.lng)) try {
      Mb(a), b = a.lng, a = a.lat, c = !1;
    } catch (d) {
      _.Bb(d);
    }
    a -= 0;
    b -= 0;
    c || (a = _.Ia(a, -90, 90), 180 != b && (b = _.Ja(b, -180, 180)));
    this.lat = function() {
      return a;
    };
    this.lng = function() {
      return b;
    }
  };
  for (var b = _.u(a), c = Array(Math.floor(a.length / 2)), d = 0, e = 0, f = 0, g = 0; d < b; ++g) {
    var h = 1,
      k = 0,
      n;
    do n = a.charCodeAt(d++) - 63 - 1, h += n << k, k += 5; while (31 <= n);
    e += h & 1 ? ~(h >> 1) : h >> 1;
    h = 1;
    k = 0;
    do n = a.charCodeAt(d++) - 63 - 1, h += n << k, k += 5; while (31 <= n);
    f += h & 1 ? ~(h >> 1) : h >> 1;
    c[g] = new _.K(1E-5 * e, 1E-5 * f, !0);
  }
  c.length = g;
  return c;
}
