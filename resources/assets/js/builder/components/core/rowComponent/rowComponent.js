angular.module('app.components').directive('rowComponent', rowComponent);

function rowComponent() {
    return {
        scope : {
          edm: '=',
          id: '='
        },
        transclude    : true,
        replace       : true,
        templateUrl   : getTemplateURL("/components/core/rowComponent/rowComponent.html"),
        link          : rowComponentLinkFunction
    }
}

function rowComponentLinkFunction(scope, elem, attrs) {
    elem.bind('click', function() {

    });
}
