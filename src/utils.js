// Generated by CoffeeScript 1.10.0
(function() {
  var ld;

  ld = require('lodash');

  exports.arrayToList = function(arr) {
    if (arr == null) {
      return arr;
    }
    return arr.join(',');
  };

  exports.paramsToCacheKey = function(params) {
    return ld.values(params).join('-');
  };

}).call(this);
