// Generated by CoffeeScript 1.10.0
(function() {
  var api, assert, ld, matchApi, pb;

  assert = require('assert');

  ld = require('lodash');

  pb = require('promise-breaker');

  matchApi = require('./match');

  api = exports.api = {
    fullname: "game-v1.3",
    name: "game",
    version: "v1.3"
  };

  exports.methods = {
    getRecentGamesForSummoner: pb["break"](function(region, summonerId, options) {
      var cacheParams, requestParams;
      if (options == null) {
        options = {};
      }
      assert.equal(matchApi.api.version, "v2.2", "match API version has changed.");
      requestParams = {
        caller: "getRecentGamesForSummoner",
        region: region,
        url: (this._makeUrl(region, api)) + "/by-summoner/" + summonerId + "/recent"
      };
      cacheParams = {
        key: api.fullname + "-games-" + region + "-" + summonerId,
        region: region,
        api: api,
        objectType: 'games',
        params: {
          summonerId: summonerId
        }
      };
      return this._riotRequestWithCache(requestParams, cacheParams, {}).then((function(_this) {
        return function(games) {
          if (games == null) {
            games = {
              games: [],
              summonerId: summonerId
            };
          }
          if (games.games == null) {
            games.games = [];
          }
          if (!options.asMatches) {
            return games;
          } else {
            return _this.Promise.all(games.games.map(function(game) {
              return _this.recentGameToMatch(region, game, summonerId, {
                matchOptions: options.asMatches === true ? null : options.asMatches
              });
            })).then(function(matches) {
              games.matches = matches;
              return games;
            });
          }
        };
      })(this));
    }),
    recentGameToMatch: pb["break"](function(region, game, summonerId, options) {
      var matchOptions;
      if (options == null) {
        options = {};
      }
      matchOptions = options.matchOptions == null ? {
        region: region
      } : ld.extend({}, options.matchOptions, {
        region: region
      });
      matchOptions.players = ld.clone(game.fellowPlayers);
      matchOptions.players.push({
        championId: game.championId,
        teamId: game.teamId,
        summonerId: summonerId
      });
      return this.getMatch(region, game.gameId, matchOptions);
    })
  };

}).call(this);
