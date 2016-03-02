angular.module('app.components').directive('rgedmColumnComponent', columnComponent);

function columnComponent($compile) {
    return {
        scope : {
          edm: '=',
          id: '=',
          parentid: '='
        },
        transclude    : true,
        replace       : true,
        templateUrl   : getTemplateURL("/components/core/columnComponent/columnComponent.html"),
        link          : columnComponentLinkFunction
    }
}

function columnComponentLinkFunction(scope, elem, attrs) {
  // var template = "<row-component data-ng-repeat='rows in edm.rows' edm='edm' id='rows.id'>"
  //   + "<column-component data-ng-repeat='c in rows.columns' edm='edm' id='c.id' parentid='rows.id'>"
  //   + "</column-component>"
  //   + "</row-component>";
  //
  //   console.log($compile(template)(scope));
  //   console.log(scope.edm);

  elem.bind('click', function() {
    scope.edm.showProperties('<rgedm-column-component-properties parentid="' + scope.parentid +'" id="' + scope.id +'" edm="edm"></rgedm-column-component-properties>');
    return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('rgedmColumnComponentProperties', columnComponentProperties);

function columnComponentProperties() {
    return {
        scope : {
          edm: '=',
          id: '=',
          parentid: '='
        },
        templateUrl   : getTemplateURL("/components/core/columnComponent/columnComponentProperties.html"),
        link          : columnComponentPropertiesLinkFunction
    }
}

function columnComponentPropertiesLinkFunction($scope, elem, attrs) {
    elem.bind('click', function() {
    });
}
