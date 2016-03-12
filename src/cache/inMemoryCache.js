// Generated by CoffeeScript 1.10.0
(function() {
  var InMemoryCache, ld;

  ld = require('lodash');

  module.exports = InMemoryCache = (function() {
    function InMemoryCache() {
      console.log("WARNING: lol-js inMemoryCache is for development and testing purposes only. For production use, use lruCache instead!");
      this.cache = Object.create(null);
    }

    InMemoryCache.prototype.get = function(params, cb) {
      return setImmediate((function(_this) {
        return function() {
          var answer, cacheEntry;
          if (params.key == null) {
            cb(new Error("Missing key"));
          }
          cacheEntry = _this.cache[params.key];
          if (cacheEntry != null) {
            answer = (cacheEntry.expires != null) && (Date.now() > cacheEntry.expires) ? null : ld.cloneDeep(cacheEntry.value);
          }
          return cb(null, answer);
        };
      })(this));
    };

    InMemoryCache.prototype.set = function(params, value) {
      return this.cache[params.key] = {
        expires: params.ttl != null ? Date.now() + params.ttl * 1000 : null,
        value: ld.cloneDeep(value)
      };
    };

    return InMemoryCache;

  })();

}).call(this);
