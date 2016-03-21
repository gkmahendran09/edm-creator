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
        link          : rgedmImageBulletComponentPropertiesFunction
    }
}

function rgedmImageBulletComponentPropertiesFunction(scope, elem, attrs) {
  var s = scope;

  // Add Point
  $('.add-point').click(function() {
    var id = $(this).data("id");
    var point = {
      "fontFamily": "Arial",
      "fontColor": "#ffffff",
      "fontSize": 16,
      "content": "Point"
    };
    s.edm.components[id].bulletProperties.push(point);
    s.$apply();
  });

  // Delete Point
  $('body').on('click', '.delete-point', function() {
    var id = $(this).data("id");
    var index = $(this).data("index");
    alert('delete-point: id = '+ id);

    s.edm.components[id].bulletProperties.splice(index, 1);
    s.$apply();
  });
}
