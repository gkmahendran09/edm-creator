angular.module('app.components').directive('bannerComponent', bannerComponent);

function bannerComponent() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        templateUrl   : getTemplateURL("/components/core/bannerComponent/bannerComponent.html"),
        link          : bannerComponentLinkFunction
    }
}

function bannerComponentLinkFunction(scope, elem, attrs) {
  elem.bind('click', function() {
    var propertiesTemplate = '<banner-component-properties edm="edm" id="' + attrs.id + '"></banner-component-properties>';
    scope.edm.showProperties(propertiesTemplate);
    return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('bannerComponentProperties', bannerComponentProperties);

function bannerComponentProperties() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        templateUrl   : getTemplateURL("/components/core/bannerComponent/bannerComponentProperties.html"),
    }
}
