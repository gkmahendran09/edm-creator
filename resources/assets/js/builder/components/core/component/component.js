angular.module('app.components').directive('rgedmComponent', component);

function component() {
    return {
        scope: {
          c: '=',
          edm: '='
        },
        replace: true,
        link          : componentLinkFunction
    }
}

function componentLinkFunction(scope, elem, attrs) {
  var directiveName = scope.c.directiveName;
  var html = scope.edm.doCompile(scope, directiveName);
  elem.append(html);
  elem.bind('click', function() {
    // scope.edm.showProperties('<edm-component-properties></edm-component-properties>');
    // return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('rgedmComponentProperties', componentProperties);

function componentProperties() {
    return {
        templateUrl   : getTemplateURL("/components/core/component/componentProperties.html"),
    }
}
