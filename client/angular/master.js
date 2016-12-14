////////////////////////////////////////////////////////////
//                        Angular                         //
////////////////////////////////////////////////////////////
var app = angular.module('app', []);

app.factory('friendsFactory', function($http) {
    var factory = {};

    factory.index = function(callback) {
        $http.get('/friends').then(function(res) {
            console.log('RESPONSE IN FACTORY (index):', res);
            if (callback && typeof callback == "function") {
                callback(res.data);
            }
        })
    }
    factory.create = function(newFriend, callback) {
        console.log('New Friend:', newFriend);
        $http.post('/friends', newFriend).then(function(res) {
            console.log('RESPONSE IN FACTORY:', res);
            if (callback && typeof callback == "function") {
                callback(res.data);
            }
        })
    }
    factory.delete = function(id, callback) {
        console.log('DELETE ID FACTORY:', id);
        $http.delete('/friends/'+id).then(function(res) {
            console.log('IN FACTORY RESPONSE:', res);
            if (callback && typeof callback == "function") {
                callback(res.data);
            }
        })
    }

    return factory;
})

app.controller('DashboardController', function($scope, friendsFactory) {
    $scope.newFriend = {};
    $scope.friends = [];

    friendsFactory.index(function(data) {
        $scope.friends = data;
        console.log('BACK TO CTRL (get):', data);
    });

    $scope.create = function() {
        friendsFactory.create($scope.newFriend, function(data) {
            console.log('back to controller:', data);
            if (data.errors) {
                //show errors
                $scope.errors = data.errors;
            } else {
                $scope.friends = data;
                $scope.newFriend = {};
            }
        })
    }

    $scope.delete = function(friend) {
        console.log('Friend to delete:', friend);
        friendsFactory.delete(friend._id, function(data) {
            console.log('back to controller', data);
            friendsFactory.index(function(data) {
                $scope.friends = data;
                console.log('BACK TO CTRL (get):', data);
            });
        });
    }
})
