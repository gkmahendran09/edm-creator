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
    //=> Core Functionality
    //--------------------------------------------------------------------------

      // Add a Component
      $scope.edm.addComponent = function(template) {
        if(template=='banner') {
          var totalComponents = $scope.edm.totalComponents;
          var newComponent = getBannerComponentData(totalComponents);
          $scope.edm.components[totalComponents] = newComponent;
          $scope.edm.totalComponents++;
        } else {
          alert("ToDo");
        }
      };

      // Delete a Component
      $scope.edm.deleteComponent = function(id) {
          if(confirm("Are you sure to delete this component?")) {
            delete $scope.edm.components[id];
            $scope.edm.showProperties('<edm-component-properties></edm-component-properties>');
            alert("Component " + id + " Deleted");
          }
      };

      // Delete a Component
      $scope.edm.uploadFile = function(file) {
          console.log(file);
      };

      // Add Row - Bottom
      $scope.edm.addRowBottom = function() {
        var newRowId = $scope.edm.rows.length;
        var newRow = getRowData(newRowId);

        $scope.edm.rows.push(newRow);
      };

      // Add Column - End
      $scope.edm.addColumnEnd = function(parentid) {
        var newColumnId = $scope.edm.rows[parentid].columns.length;
        var newColumn = getColumnData(parentid, newColumnId);

        $scope.edm.rows[parentid].columns.push(newColumn);
      };

      // Add Banner Image
      $scope.edm.addBannerImage = function(parentid, id) {
        var content = $scope.edm.rows[parentid].columns[id].content;
        var newContent = '<img src="images/rage.png">' + content;

        $scope.edm.rows[parentid].columns[id].content = newContent;
      };

    //--------------------------------------------------------------------------

}
