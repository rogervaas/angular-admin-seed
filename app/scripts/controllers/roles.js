'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:SettingCtrl
 * @description
 * # SettingCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('RoleCtrl', function($scope, $cookies, Helper, Options) {
    var appConfig = JSON.parse($cookies.get('appConfig'));

    $scope.optionTypes = [
        {text: 'text', value: 'text' },
        {text: 'checkbox', value: 'checkbox' },
        {text: 'textarea', value: 'textarea' },
        {text: 'select', value: 'select' },
    ];
    $scope.roles = Helper.getOptionValueByKey('roles', appConfig);
    $scope.roles.optionValue = JSON.parse($scope.roles.optionValue);

    // Starting to delete a field
    $scope.startDelete = function(key){
        $scope.deleteKey = key;
    };

    // update a capacity
    $scope.updateRole = function(){
        var optionData = {
            id: $scope.roles.id,
            optionKey: 'roles',
            optionValue: $scope.roles.optionValue
        };
        Options.update(optionData).then(function(data){
            console.log(data);
        });
    };

    // delete a role
    $scope.deleteRole = function(key){
        $scope.roles.optionValue.splice(key, 1);
        $scope.updateRole();
    };

    // add a new role
    $scope.addRole = function(){
        var optionValue = {
            name: null,
            label: null,
            description: null
        };
        $scope.roles.optionValue.push(optionValue);
    };

    $scope.capacities = Helper.getOptionValueByKey('capacities', appConfig);
    $scope.capacities.optionValue = JSON.parse($scope.capacities.optionValue);

    // update a capacity
    $scope.updateCapacity = function(){
        var optionData = {
            id: $scope.capacities.id,
            optionKey: 'capacities',
            optionValue: $scope.capacities.optionValue
        };
        Options.update(optionData).then(function(data){
            console.log(data);
        });
    };

    // delete a capacities
    $scope.deleteCapacity = function(key){
        $scope.capacities.optionValue.splice(key, 1);
        $scope.updateCapacity();
    };

    // add a new capacity
    $scope.addCapacity = function(){
        var optionValue = {
            name: null,
            description: null
        };
        $scope.capacities.optionValue.push(optionValue);
    };

    $scope.forUnitTest = true;
});