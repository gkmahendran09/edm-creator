angular.module('app.components').directive('rgedmTextComponent', textComponent);

function textComponent() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        replace: true,
        templateUrl   : getTemplateURL("/components/core/textComponent/textComponent.html"),
        link          : textComponentLinkFunction
    }
}

function textComponentLinkFunction(scope, elem, attrs) {

  elem.bind('click', function() {
    $(".edm-component").removeClass("active");
    elem.addClass("active");
    var propertiesTemplate = '<rgedm-text-component-properties edm="edm" id="' + attrs.id + '"></rgedm-text-component-properties>';
    scope.edm.showProperties(propertiesTemplate);
    return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('rgedmTextComponentProperties', textComponentProperties);

function textComponentProperties() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        templateUrl   : getTemplateURL("/components/core/textComponent/textComponentProperties.html"),
    }
}
