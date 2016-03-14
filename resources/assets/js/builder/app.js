angular.module('edmApp', [ 'app.filters', 'app.controllers', 'app.components', 'colorpicker.module', 'cfp.hotkeys', 'rgEdmRichTextEditor.module' ]);

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

  $("body").on("click", ".toolbox-toggler", function() {
      $("#edm-components").toggleClass("active");
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
            "fontWeight": "normal",
            "fontStyle": "normal",
            "textDecoration": "none",
            "fontFamily": "Arial",
            "fontColor": "#000000",
            "fontSize": 12,
            "backgroundColor": "#ffffff",
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "borderTopStyle": 'solid',
            "borderBottomStyle": 'solid',
            "borderLeftStyle": 'solid',
            "borderRightStyle": 'solid',
            "borderTopColor": 'none',
            "borderBottomColor": 'none',
            "borderLeftColor": 'none',
            "borderRightColor": 'none',
            "borderTopWidth": 0,
            "borderBottomWidth": 0,
            "borderLeftWidth": 0,
            "borderRightWidth": 0,
            "content":"New Text Component",
            "textAlign": "left"
          }
      };
      break;
    case 'rich-text':
      data =  {
        "order": orderId,
        "directiveName": "<rgedm-rich-text-component id=\"" + id + "\" edm=\"edm\"></rgedm-rich-text-component>",
        "properties": {
            "fontFamily": "Arial",
            "fontColor": "#000000",
            "fontSize": 12,
            "backgroundColor": "#ffffff",
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "content":"New Rich Text Component"
          }
      };
      break;
    case 'image-bullet':
      data =  {
        "order": orderId,
        "directiveName": "<rgedm-image-bullet-component id=\"" + id + "\" edm=\"edm\"></rgedm-image-bullet-component>",
        "properties": {
            "fontFamily": "Arial",
            "fontColor": "#000000",
            "fontSize": 12,
            "backgroundColor": "#ffffff",
            "paddingTop": 0,
            "paddingBottom": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "title":"Title",
            "bullets": [
              "Point 1",
              "Point 2"
            ]
          }
      };
      break;
  }

  return data;

}

//--------------------------------------------------------------------------
