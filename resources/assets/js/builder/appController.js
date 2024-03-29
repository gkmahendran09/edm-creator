angular.module('app.controllers', []).controller('edmController', edmController);

function edmController($scope, $compile, $window) {

    // EDM Data
    $scope.edm = getScopeValues();

    $scope.edm.changed = false;    

    $scope.edm.assetManagerURL                = getAssetManagerURL();

    $scope.edm.previewURL                     = getPreviewURL();

    $scope.edm.componentDefaultsURL           = getTemplateURL('/common/componentDefaults.html');

    $scope.edm.componentFontFamilyOptionsURL  = getTemplateURL('/common/componentFontFamilyOptions.html');

    //--------------------------------------------------------------------------
    //=> Custom Watches
    //--------------------------------------------------------------------------

    var edmStatusWatcher = $scope.$watch('edm', function(oldVal, newVal) {
                          if(oldVal != newVal) {
                            $scope.edm.changed = true;
                            edmStatusWatcher(); // De-register `this` watcher
                          }
                        }, true);

    //--------------------------------------------------------------------------


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

        if(template == 'banner' || template == 'text' || template == 'rich-text' || template == 'image-bullet' || template == 'image-para') {
          $scope.edm.lastComponentId++;
          var lastComponentId = $scope.edm.lastComponentId;
          var totalComponents = $scope.edm.totalComponents;

          var newComponent = getComponentData(template, lastComponentId, totalComponents); // componentName, id, orderId
          if(newComponent != "") {
            $scope.edm.components[lastComponentId] = newComponent;

            $scope.edm.totalComponents++;
          } else {
            $scope.edm.lastComponentId--;
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


            var currentOrderId = $scope.edm.components[id].order;
            delete $scope.edm.components[id];


            $scope.edm.totalComponents--;


            if($scope.edm.totalComponents < 0) {
              $scope.edm.totalComponents = 0;
            }


            angular.forEach($scope.edm.components, function(component) {
              if(component.order > currentOrderId) {
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

      // Clone a Component
      $scope.edm.clone = function(orderId) {


          $scope.edm.lastComponentId++;
          var lastComponentId = $scope.edm.lastComponentId;
          var totalComponents = $scope.edm.totalComponents;

          var newComponent = (JSON.parse(JSON.stringify($scope.edm.components[orderId])));

          newComponent.order = totalComponents;
          var newDirective = newComponent.directiveName;

          newComponent.directiveName = newDirective.replace(/id="(\d*)"/g, 'id="' + lastComponentId + '"');

          $scope.edm.components[lastComponentId] = newComponent;


          $scope.edm.totalComponents++;

          $scope.edm.save(); // Quick fix - Save the edm

      };

    //--------------------------------------------------------------------------

}
