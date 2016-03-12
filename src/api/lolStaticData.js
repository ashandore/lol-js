// Generated by CoffeeScript 1.10.0
(function() {
  var api, ld, makeUrl, pb;

  ld = require('lodash');

  pb = require('promise-breaker');

  api = exports.api = {
    fullname: "lol-static-data-v1.2",
    name: "lol-static-data",
    version: "v1.2"
  };

  makeUrl = function(region) {
    return "https://global.api.pvp.net/api/lol/static-data/" + region + "/v1.2";
  };

  exports.methods = {
    getChampions: pb["break"](function(region, options) {
      var cacheParams, ref, requestParams;
      if (options == null) {
        options = {};
      }
      options = ld.defaults({}, options, {
        dataById: false
      });
      requestParams = {
        caller: "getChampions",
        region: region,
        url: (makeUrl(region, api)) + "/champion",
        queryParams: ld.pick(options, ['locale', 'version', 'dataById', 'champData']),
        rateLimit: false
      };
      cacheParams = {
        key: (api.fullname + "-champions-" + region + "-" + options.locale + "-" + options.version + "-") + ((options.dataById ? 't' : 'f') + "-" + (((ref = options.champData) != null ? ref : []).join(','))),
        api: api,
        region: region,
        objectType: 'champions',
        params: requestParams.queryParams
      };
      return this._riotRequestWithCache(requestParams, cacheParams, {});
    }),
    getChampionById: pb["break"](function(region, id, options) {
      if (options == null) {
        options = {};
      }
      options = ld.extend({}, options, {
        dataById: true
      });
      return this.getChampions(region, options).then(function(champions) {
        return champions.data[id];
      });
    }),
    getChampionByKey: pb["break"](function(region, key, options) {
      if (options == null) {
        options = {};
      }
      options = ld.extend({}, options, {
        dataById: false
      });
      return this.getChampions(region, options).then(function(champions) {
        return champions.data[key];
      });
    }),
    getChampionByName: pb["break"](function(region, name, options) {
      if (options == null) {
        options = {};
      }
      options = ld.extend({}, options, {
        dataById: false
      });
      return this.getChampions(region, options).then(function(champions) {
        var answer, championsByName;
        answer = champions.data[name];
        if (answer == null) {
          championsByName = ld.indexBy(champions.data, function(c) {
            return c.name.toLowerCase().replace(/\W/g, '');
          });
          answer = championsByName[name.toLowerCase().replace(/\W/g, '')];
        }
        return answer;
      });
    }),
    getItems: pb["break"](function(region, options) {
      var cacheParams, requestParams;
      if (options == null) {
        options = {};
      }
      options = ld.defaults({}, options, {
        dataById: false
      });
      requestParams = {
        caller: "getItems",
        region: region,
        url: (makeUrl(region, api)) + "/item",
        queryParams: ld.pick(options, ['locale', 'version', 'tags']),
        rateLimit: false
      };
      cacheParams = {
        key: (api.fullname + "-items-" + region + "-" + options.locale + "-" + options.version + "-") + options.tags.join(","),
        api: api,
        region: region,
        objectType: 'items',
        params: requestParams.queryParams
      };
      return this._riotRequestWithCache(requestParams, cacheParams, {});
    }),
    getItemById: pb["break"](function(region, id, options) {
      if (options == null) {
        options = {};
      }
      return this.getItems(region, options).then(function(objects) {
        return objects.data[id];
      });
    }),
    getSummonerSpells: pb["break"](function(region, options) {
      var cacheParams, requestParams;
      if (options == null) {
        options = {};
      }
      options = ld.defaults({}, options, {
        dataById: false
      });
      requestParams = {
        caller: "getSummonerSpells",
        region: region,
        url: (makeUrl(region, api)) + "/summoner-spell",
        queryParams: ld.pick(options, ['locale', 'version', 'tags']),
        rateLimit: false
      };
      cacheParams = {
        key: (api.fullname + "-spells-" + region + "-" + options.locale + "-" + options.version + "-") + options.tags.join(","),
        api: api,
        region: region,
        objectType: 'spells',
        params: requestParams.queryParams
      };
      return this._riotRequestWithCache(requestParams, cacheParams, {});
    }),
    getSummonerSpellById: pb["break"](function(region, id, options) {
      if (options == null) {
        options = {};
      }
      return this.getSummonerSpells(region, options).then(function(objects) {
        var spell;
        return (function() {
          var i, len, ref, results;
          ref = objects.data;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            spell = ref[i];
            if (spell.id === id) {
              results.push(spell);
            }
          }
          return results;
        })();
      });
    }),
    getVersions: pb["break"](function(region) {
      var cacheParams, requestParams;
      requestParams = {
        caller: "getVersions",
        region: region,
        url: (makeUrl(region, api)) + "/versions",
        rateLimit: false
      };
      cacheParams = {
        key: api.fullname + "-versions-" + region,
        api: api,
        region: region,
        objectType: 'versions',
        params: {}
      };
      return this._riotRequestWithCache(requestParams, cacheParams, {});
    }),
    teamNameToId: function(teamName) {
      if (teamName.toLowerCase() === "blue") {
        return 100;
      } else {
        return 200;
      }
    }
  };

}).call(this);
