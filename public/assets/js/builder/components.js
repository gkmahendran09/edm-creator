angular.module('app.components',[]);

angular.module('rgEdmRichTextEditor.module', [ 'colorpicker.module'])
.directive('rgEdmRichTextEditor', function ($interval, $window, $compile) {
	return {
		restrict: "A",
		require: '^ngModel',
		scope: {},
		link: function(scope, elem, attrs, ngModel) {

			scope.edm = {};

			scope.edm.foreColor = "#000000";
			scope.edm.backColor = "#ffffff";
			scope.edm.createLink = "http://";

			scope.$watch('edm.foreColor', function(val) {
				scope.edm.formatSelection('foreColor', false, val)
			});

			scope.$watch('edm.backColor', function(val) {
				scope.edm.formatSelection('backColor', false, val)
			});

			scope.$watch('edm.createLink', function(val) {
				scope.edm.formatSelection('createLink', false, val);
			});

			var stop = $interval(function() {
				ngModel.$setViewValue(editor.body.innerHTML);
			}, 500);

			elem.on('$destroy', function() {
				scope.stopInterval();
			});

			scope.stopInterval = function() {
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
        }
      };

			elem.jhtmlareaObject = this;

      var textarea = this.textarea = $(elem);
      // var container = this.container = $("<div/>").addClass("jHtmlArea").width(textarea.width()).insertAfter(textarea);
      var container = this.container = $("<div/>").addClass("jHtmlArea").width("100%").insertAfter(textarea);

      var toolbar = this.toolbar = $("<div/>").addClass("ToolBar").appendTo(container);
      toolbar.html($compile('<style>.jHtmlArea.fullScreen { bottom: 0; top: 0; left: 0; right: 0; position: fixed; background: #fff; } .jHtmlArea.fullScreen iframe { height: 100%; }</style><div class="btn-group"> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'bold\', false, null);"> <span class="glyphicon glyphicon-bold"></span> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'italic\', false, null);"> <span class="glyphicon glyphicon-italic"></span> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'underline\', false, null);"> <u><b>U</b></u> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'strikeThrough\', false, null);"> <strike>S</strike> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'strikeThrough\', false, null);"> <span class="glyphicon glyphicon-font"></span> </button> <div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="glyphicon glyphicon-text-color"></span> </button> <ul class="dropdown-menu"> <li> <a href="javascript:void(0);"> <input type="text" data-ng-model="edm.foreColor" colorpicker> </a> </li></ul> </div><div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="glyphicon glyphicon-text-background"></span> </button> <ul class="dropdown-menu"> <li> <a href="javascript:void(0);"> <input type="text" data-ng-model="edm.backColor" colorpicker> </a> </li></ul> </div><div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="glyphicon glyphicon-link"></span> </button> <ul class="dropdown-menu"> <li> <a href="javascript:void(0);"> <input type="text" data-ng-model="edm.createLink"> </a> </li></ul> </div><button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'unlink\', false, null);"> <span class="glyphicon glyphicon-remove"></span> </button><button type="button" class="btn btn-default" data-ng-click="edm.toggleFullScreen();" id="fullScreenTButton"> <span class="glyphicon glyphicon-fullscreen"></span> </button> </div>')(scope));

      // var iframe = this.iframe = $("<iframe/>").height(textarea.height());
			// iframe.width(textarea.width());
      var iframe = this.iframe = $("<iframe/>");
      // iframe.height("96%");
      iframe.width("96%");

      var htmlarea = this.htmlarea = $("<div style='height: calc(100% - 30px);' />").append(iframe);

      container.append(htmlarea).append(textarea.hide());

			var edit = this.editor = this.iframe[0].contentWindow.document;
      edit.designMode = 'on';
      edit.open();
      edit.write(ngModel.$viewValue);
      edit.close();

			scope.edm.formatSelection = function(a, b, c) {
				// iframe[0].contentWindow.focus();
				// console.log(iframe[0].contentDocument.defaultView.getSelection().toString());
				var elem = iframe[0].contentDocument.defaultView.getSelection().getRangeAt(0).cloneContents();
				console.log($("<p/>").append($(elem)).html());
				$(editor).find('a').attr('target', '_blank');
				editor.execCommand(a, b, c);

			};

			scope.edm.toggleFullScreen = function() {
				$("#fullScreenTButton").find("span").toggleClass("glyphicon-fullscreen glyphicon-resize-small");
				$(".jHtmlArea").toggleClass("fullScreen");
			};

			ngModel.$render = function () {
				editor.body.innerHTML = ngModel.$viewValue;
			};
    }
  }
});

angular.module('app.components').directive('rgedmEdmComponent', edmComponent);

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


angular.module('app.components').directive('rgedmEdmComponentProperties', edmComponentProperties);

function edmComponentProperties() {
    return {
        templateUrl   : getTemplateURL("/components/core/edmComponent/edmComponentProperties.html"),
    }
}

angular.module('app.components').directive('rgedmComponent', component);

function component() {
    return {
        scope: {
          c: '=',
          edm: '='
        },
        replace: true,
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


angular.module('app.components').directive('rgedmComponentProperties', componentProperties);

function componentProperties() {
    return {
        templateUrl   : getTemplateURL("/components/core/component/componentProperties.html"),
    }
}

angular.module('app.components').directive('rgedmBannerComponent', bannerComponent);

function bannerComponent() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        replace: true,
        templateUrl   : getTemplateURL("/components/core/bannerComponent/bannerComponent.html"),
        link          : bannerComponentLinkFunction
    }
}

function bannerComponentLinkFunction(scope, elem, attrs) {
  elem.bind('click', function() {
    $(".edm-component").removeClass("active");
    elem.addClass("active");
    var propertiesTemplate = '<rgedm-banner-component-properties edm="edm" id="' + attrs.id + '"></rgedm-banner-component-properties>';
    scope.edm.showProperties(propertiesTemplate);
    return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('rgedmBannerComponentProperties', bannerComponentProperties);

function bannerComponentProperties() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        templateUrl   : getTemplateURL("/components/core/bannerComponent/bannerComponentProperties.html"),
    }
}

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

angular.module('app.components').directive('rgedmRichTextComponent', richTextComponent);

function richTextComponent() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        replace: true,
        templateUrl   : getTemplateURL("/components/core/richTextComponent/richTextComponent.html"),
        link          : richTextComponentLinkFunction
    }
}

function richTextComponentLinkFunction(scope, elem, attrs) {
  elem.bind('click', function() {
    $(".edm-component").removeClass("active");
    elem.addClass("active");
    var propertiesTemplate = '<rgedm-rich-text-component-properties edm="edm" id="' + attrs.id + '"></rgedm-rich-text-component-properties>';
    scope.edm.showProperties(propertiesTemplate);
    return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('rgedmRichTextComponentProperties', richTextComponentProperties);

function richTextComponentProperties() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        templateUrl   : getTemplateURL("/components/core/richTextComponent/richTextComponentProperties.html"),
    }
}

angular.module('app.components').directive('rgedmTextComponent', textComponent);

function textComponent() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        replace: true,
        templateUrl   : getTemplateURL("/components/core/textComponent/textComponent.html"),
        link          : textComponentLinkFunction
    }
}

function textComponentLinkFunction(scope, elem, attrs) {

  elem.bind('click', function() {
    $(".edm-component").removeClass("active");
    elem.addClass("active");
    var propertiesTemplate = '<rgedm-text-component-properties edm="edm" id="' + attrs.id + '"></rgedm-text-component-properties>';
    scope.edm.showProperties(propertiesTemplate);
    return false;
  });
}

//--------------------------------
//=> Component Properties
//--------------------------------


angular.module('app.components').directive('rgedmTextComponentProperties', textComponentProperties);

function textComponentProperties() {
    return {
        scope: {
          id: '=',
          edm: '='
        },
        templateUrl   : getTemplateURL("/components/core/textComponent/textComponentProperties.html"),
    }
}

//# sourceMappingURL=components.js.map
