var app = angular.module('nbaRoutes');

app.controller('homeCtrl', function ($scope, teamService) {
    teamService.getTeamData('') // for 3 teams

});
