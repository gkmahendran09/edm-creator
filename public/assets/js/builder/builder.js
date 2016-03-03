angular.module('app.filters', ['ngSanitize']).filter('trustAsHtml', trustAsHTMLFilter);

angular.module('app.filters').filter('assetURL', assetURLFilter);

angular.module('app.filters').filter('basename', basenameFilter);

angular.module('app.filters').filter('orderObjectBy', orderObjectByFilter);

function trustAsHTMLFilter($sce) {
  return $sce.trustAsHtml;
}

function assetURLFilter() {
  return function(input) {
      return getAssetURL(input);
  }
}

function basenameFilter() {
  return function(input) {
      var valArr = input.split("/");
      var val = valArr[(valArr.length) - 1];
      return val;
  }
}

function orderObjectByFilter() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
}

angular.module('app.controllers', []).controller('edmController', edmController);

function edmController($scope, $compile) {

    // EDM Data
    $scope.edm = getScopeValues();

    //--------------------------------------------------------------------------
    //=> Common
    //--------------------------------------------------------------------------

      // Do Template Compilation
      $scope.edm.doCompile = function(scope, template) {
        var template = template;
        var linkFn = $compile(template);
        var element = linkFn(scope);
        return element;
      };

      // Show Properties of a Component
      $scope.edm.showProperties = function(template) {
        var element = $scope.edm.doCompile($scope, template);
        $("#edm-properties").html(element);
        return false;
      };

    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    //=> Helpers
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    //=> Core Functionality
    //--------------------------------------------------------------------------

      // Add a Component
      $scope.edm.addComponent = function(template) {
        if(template=='banner') {
          var lastComponentId = $scope.edm.lastComponentId;
          var newComponent = getBannerComponentData(lastComponentId);
          $scope.edm.components[lastComponentId] = newComponent;
          $scope.edm.lastComponentId++;
        } else {
          alert("ToDo");
        }
      };

      // Delete a Component
      $scope.edm.deleteComponent = function(id) {
          if(confirm("Are you sure to delete this component?")) {
            delete $scope.edm.components[id];
            $scope.edm.totalComponents--;
            $scope.edm.showProperties('<rgedm-edm-component-properties></rgedm-edm-component-properties>');
            alert("Component " + id + " Deleted");
          }
      };

      // Move Up a Component
      $scope.edm.moveUp = function(orderId) {
        var currentOrderId  = orderId;
        var prevOrderId     = orderId - 1;

        angular.forEach($scope.edm.components, function(component) {
          if(component.order == currentOrderId) {
              component.order = prevOrderId;
          }
          else if(component.order == prevOrderId) {
            component.order = currentOrderId;
          }
        });
      };

      // Move Down a Component
      $scope.edm.moveDown = function(orderId) {
          var currentOrderId  = orderId;
          var nextOrderId     = orderId + 1;

          angular.forEach($scope.edm.components, function(component) {
            if(component.order == currentOrderId) {
                component.order = nextOrderId;
            }
            else if(component.order == nextOrderId) {
              component.order = currentOrderId;
            }
          });
      };

    //--------------------------------------------------------------------------

}

angular.module('edmApp', [ 'app.filters', 'app.controllers', 'app.components', 'colorpicker.module' ]);

$(window).ready(function() {
  $("#edm-document").trigger("click");
});
$(document).ready(function() {
  $("body").on("click", ".edm-component", function() {
      $(".edm-component").removeClass("active");
      $(this).addClass("active");
  });
});


//--------------------------------------------------------------------------
//=> Reusable Functions
//--------------------------------------------------------------------------

// Get Asset URL
function getAssetURL(path) {
  return '/user/edm/front-end-asset?path=' + path;
}

// Get Template URL
function getTemplateURL(path) {
  return '/user/edm/front-end-template?path=' + path;
}

// Get Banner Component Data
function getBannerComponentData(id) {
  return {    
    "directiveName": "<rgedm-banner-component id=\"" + id + "\" edm=\"edm\"></rgedm-banner-component>",
    "properties": {
        "src": "images/header.jpg",
        "alt": "Making your world safer!",
        "title": "Making your world safer!"
      }
  };
}

// Get Row Data
function getRowData(RowId) {
  return {
    "id": RowId,
    "columns": [
      {
        "id":0,
        "backgroundColor": "#bc1",
        "content": "Row " + RowId + " Column 1"
      }
    ]
  };
}

// Get Column Data
function getColumnData(RowId, ColumnId) {
  return {
    "id": ColumnId,
    "backgroundColor": "#bc1",
    "content": "Row " + RowId + " Column " + ColumnId
  };
}

//# sourceMappingURL=builder.js.map
