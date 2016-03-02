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
