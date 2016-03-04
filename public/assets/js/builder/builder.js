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

    $scope.edm.componentDefaultsURL           = getTemplateURL('/common/componentDefaults.html');

    $scope.edm.componentFontFamilyOptionsURL  = getTemplateURL('/common/componentFontFamilyOptions.html');

    //--------------------------------------------------------------------------
    //=> Common
    //--------------------------------------------------------------------------


      // Save the EDM
      $scope.edm.save = function() {
        $("#edm_save_form").submit();
        return false;
      };

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

        if(template == 'banner' || template == 'text') {
          var lastComponentId = $scope.edm.lastComponentId;

          var newComponent = getComponentData(template, lastComponentId, $scope.edm.totalComponents);
          if(newComponent != "") {
            $scope.edm.components[lastComponentId] = newComponent;

            $scope.edm.totalComponents++;
            $scope.edm.lastComponentId++;
          } else {
            alert("Invalid Component");
          }
        }
        else {
          alert("ToDo");
        }

      };

      // Delete a Component
      $scope.edm.deleteComponent = function(id) {
          if(confirm("Are you sure to delete this component?")) {
            delete $scope.edm.components[id];
            $scope.edm.totalComponents--;

            if($scope.edm.totalComponents < 0) {
              $scope.edm.totalComponents = 0;
            }

            angular.forEach($scope.edm.components, function(component) {
              if(component.order != 0) {
                component.order = component.order - 1;
              }
            });

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

angular.module('edmApp', [ 'app.filters', 'app.controllers', 'app.components', 'colorpicker.module', 'cfp.hotkeys' ]);

//--------------------------------------------------------------------------
//=> App:: jQuery
//--------------------------------------------------------------------------

$(window).ready(function() {
  $("#edm-document").trigger("click");
});
$(document).ready(function() {
  $("body").on("click", ".edm-component", function() {
      $(".edm-component").removeClass("active");
      $(this).addClass("active");
  });

  // var windowHeight = $(window).outerHeight();
  //
  // $(window).resize(function() {
  //   if(windowHeight != $(window).outerHeight()) {
  //       windowHeight = $(window).outerHeight();
  //       $("#edm-builder #edm-document").height(windowHeight-180);
  //       $("#edm-properties .panel-body").height(windowHeight-150);
  //   }
  // });
});

//--------------------------------------------------------------------------


//--------------------------------------------------------------------------
//=> App:: Functions
//--------------------------------------------------------------------------

function getCurrentScopeValues() {
	var html = $("#edm-document").html();
	var scope_values = angular.toJson($('#edit-edm').scope().edm);
	$("#form_html").val(html);
	$("#form_scope_values").val(scope_values);
	return true;
}

//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
//=> EDM:: Functions
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
function getComponentData(componentName, id, orderId) {
  var data = '';
  switch(componentName) {
    case 'banner':
      data =  {
        "order": orderId,
        "directiveName": "<rgedm-banner-component id=\"" + id + "\" edm=\"edm\"></rgedm-banner-component>",
        "properties": {
            "haveLink": false,
            "linkURL": "",
            "src": "images/header.jpg",
            "alt": "Making your world safer!",
            "title": "Making your world safer!",
            "paddingTop": 0,
            "paddingBottom": 0
          }
      };
      break;
    case 'text':
      data =  {
        "order": orderId,
        "directiveName": "<rgedm-text-component id=\"" + id + "\" edm=\"edm\"></rgedm-text-component>",
        "properties": {
            "fontFamily": "Arial",
            "fontColor": "#000000",
            "fontSize": 12,
            "backgroundColor": "#ffffff",
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "content":"New Text Component"
          }
      };
      break;
  }

  return data;

}

//--------------------------------------------------------------------------

//# sourceMappingURL=builder.js.map
