import angular from 'angular';
import UserService from '../../services/user.service';

function requiredRole() {
    return {
        restrict: 'E',
        link($scope, $element, attrs) {
            $element.addClass('ng-hide');
            UserService.hasPermission(attrs.requiredRole)
                .then(() => {
                    $element.removeClass('ng-hide');
                })
                .catch(() => {
                    $element.addClass('ng-hide');
                });
        },
    };
}


export default angular.module('directives.requiredRole', [UserService])
    .directive('requiredRole', requiredRole)
    .name;
