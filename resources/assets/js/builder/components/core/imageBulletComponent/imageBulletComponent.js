angular.module('app.components').directive('rgedmImageBulletComponent', imageBulletComponent);

function imageBulletComponent() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        replace: true,
        templateUrl   : getTemplateURL("/components/core/imageBulletComponent/imageBulletComponent.html"),
        link          : imageBulletComponentLinkFunction
    }
}

function imageBulletComponentLinkFunction(scope, elem, attrs) {
  elem.bind('click', function() {
    $(".edm-component").removeClass("active");
    elem.addClass("active");
    var propertiesTemplate = '<rgedm-image-bullet-component-properties edm="edm" id="' + attrs.id + '"></rgedm-image-bullet-component-properties>';
    scope.edm.showProperties(propertiesTemplate);
    return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('rgedmImageBulletComponentProperties', imageBulletComponentProperties);

function imageBulletComponentProperties() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        templateUrl   : getTemplateURL("/components/core/imageBulletComponent/imageBulletComponentProperties.html"),
    }
}
