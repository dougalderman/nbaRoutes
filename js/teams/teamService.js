var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {

    // service code
    this.addNewGame = function(gameObj) {

        var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
        if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore))
          gameObj.won = true;
        else {
          gameObj.won = false;
        }
        return $http({
          method: 'POST',
          url: url,
          data: gameObj
        })
    };

    this.getTeamData = function(team) {
      var deferred = $q.defer();
      var url = 'https://api.parse.com/1/classes/' + team;
      $http({
        method: 'GET',
        url: url
      })
      .then(function(data) {
        if (data.status === 200) {
           var results = data.data.results;
           var wins = 0;
           var losses = 0;
           for (var i = 0; i < results.length; i++) {
             if (results[i].won)
                wins++;
             else {
                losses++;
             }
           }
           results.wins = wins;
           results.losses = losses;
           deferred.resolve(results);
        }
        else {
          console.log('status code is ' + data.status)
          deferred.reject(data.status);
        }
      })
      .catch(function(err) {
        deferred.reject(err);
      })

    return deferred.promise;

    };



});
