angular.module('app.components').directive('rgedmImageParaComponent', imageParaComponent);

function imageParaComponent() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        replace: true,
        templateUrl   : getTemplateURL("/components/core/imageParaComponent/imageParaComponent.html"),
        link          : imageParaComponentLinkFunction
    }
}

function imageParaComponentLinkFunction(scope, elem, attrs) {
  elem.bind('click', function() {
    $(".edm-component").removeClass("active");
    elem.addClass("active");
    var propertiesTemplate = '<rgedm-image-Para-component-properties edm="edm" id="' + attrs.id + '"></rgedm-image-Para-component-properties>';
    scope.edm.showProperties(propertiesTemplate);
    return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('rgedmImageParaComponentProperties', imageParaComponentProperties);

function imageParaComponentProperties() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        templateUrl   : getTemplateURL("/components/core/imageParaComponent/imageParaComponentProperties.html"),
        link          : rgedmImageParaComponentPropertiesFunction
    }
}

function rgedmImageParaComponentPropertiesFunction(scope, elem, attrs) {
  // var s = scope;
  //
  // // Add Point
  // $('.add-para').click(function() {
  //   var id = $(this).data("id");
  //   var point = {
  //     "fontFamily": "Arial",
  //     "fontColor": "#ffffff",
  //     "fontSize": 16,
  //     "content": "Point"
  //   };
  //   s.edm.components[id].ParaProperties.push(point);
  //   s.$apply();
  // });
  //
  // // Delete Point
  // $('body').on('click', '.delete-point', function() {
  //   var id = $(this).data("id");
  //   var index = $(this).data("index");
  //   alert('delete-point: id = '+ id);
  //
  //   s.edm.components[id].ParaProperties.splice(index, 1);
  //   s.$apply();
  // });
}
