angular.module('app.components').directive('edmComponent', edmComponent);

function edmComponent() {
    return {
        scope : {
          edm: '='
        },
        transclude    : true,
        replace       : true,
        templateUrl   : getTemplateURL("/components/core/edmComponent/edmComponent.html"),
        link          : edmComponentLinkFunction
    }
}

function edmComponentLinkFunction(scope, elem, attrs) {
  elem.bind('click', function() {
    // scope.edm.showProperties('<edm-component-properties></edm-component-properties>');
    // return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('edmComponentProperties', edmComponentProperties);

function edmComponentProperties() {
    return {
        templateUrl   : getTemplateURL("/components/core/edmComponent/edmComponentProperties.html"),
    }
}
