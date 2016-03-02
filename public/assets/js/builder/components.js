angular.module('app.components',[]);

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

angular.module('app.components').directive('columnComponent', columnComponent);

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
    scope.edm.showProperties('<column-component-properties parentid="' + scope.parentid +'" id="' + scope.id +'" edm="edm"></column-component-properties>');
    return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('columnComponentProperties', columnComponentProperties);

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

angular.module('app.components').directive('component', component);

function component() {
    return {
        scope: {
          c: '=',
          edm: '='
        },
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


angular.module('app.components').directive('componentProperties', componentProperties);

function componentProperties() {
    return {
        templateUrl   : getTemplateURL("/components/core/component/componentProperties.html"),
    }
}

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

//# sourceMappingURL=components.js.map
