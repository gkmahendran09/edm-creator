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
			// scope.edm.createLink = "http://";

			scope.$watch('edm.foreColor', function(val) {
				scope.edm.formatSelection('foreColor', false, val)
			});

			scope.$watch('edm.backColor', function(val) {
				scope.edm.formatSelection('backColor', false, val)
			});

			// scope.$watch('edm.createLink', function(val) {
			// 	scope.edm.formatSelection('createLink', false, val);
			// });
			//
			var stop = $interval(function() {
				ngModel.$setViewValue(edit.body.innerHTML);
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
      toolbar.html($compile('<style>.jHtmlArea.fullScreen { bottom: 0; top: 0; left: 0; right: 0; position: fixed; background: #fff; } .jHtmlArea.fullScreen iframe { height: 100%; }</style><div class="btn-group"> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'bold\', false, null);"> <span class="glyphicon glyphicon-bold"></span> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'italic\', false, null);"> <span class="glyphicon glyphicon-italic"></span> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'underline\', false, null);"> <u><b>U</b></u> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'strikeThrough\', false, null);"> <strike>S</strike> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'strikeThrough\', false, null);"> <span class="glyphicon glyphicon-font"></span> </button> <div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="glyphicon glyphicon-text-color"></span> </button> <ul class="dropdown-menu"> <li> <a href="javascript:void(0);"> <input type="text" data-ng-model="edm.foreColor" colorpicker> </a> </li></ul> </div><div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="glyphicon glyphicon-text-background"></span> </button> <ul class="dropdown-menu"> <li> <a href="javascript:void(0);"> <input type="text" data-ng-model="edm.backColor" colorpicker> </a> </li></ul> </div><div class="btn-group"> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'superscript\', false, null);"> <span class="glyphicon glyphicon-superscript"></span> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'createLink\', false, null);"> <span class="glyphicon glyphicon-link"></span> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'unlink\', false, null);"> <span class="glyphicon glyphicon-remove"></span> </button><button type="button" class="btn btn-default" data-ng-click="edm.toggleFullScreen();" id="fullScreenTButton"> <span class="glyphicon glyphicon-fullscreen"></span> </button> </div>')(scope));

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

				if(a == "createLink") {

						// iframe[0].contentWindow.focus();
						// console.log(iframe[0].contentDocument.defaultView.getSelection().toString());
						var elem = iframe[0].contentDocument.defaultView.getSelection().getRangeAt(0).cloneContents();
						// console.log($("<p/>").append($(elem)).html());

						bootbox.dialog({
							title: "Add a Link",
							message: '<div class="row">  ' +
							'<div class="col-md-12"> ' +
							'<form class="form-horizontal"> ' +
							'<div class="form-group"> ' +
							'<label class="col-md-4 control-label" for="url">URL</label> ' +
							'<div class="col-md-4"> ' +
							'<input id="url" name="url" type="text" placeholder="URL" class="form-control input-md"> ' +
							'<span class="help-block">Enter the URL</span> </div> ' +
							'</div> ' +
							'<div class="form-group"> ' +
							'<label class="col-md-4 control-label" for="textColor">Text Color</label> ' +
							'<div class="col-md-4"> ' +
							'<input id="textColor" name="textColor" type="text" placeholder="Text Color" class="form-control input-md"> ' +
							'<span class="help-block">Enter the Text Color</span> </div> ' +
							'</div> ' +
							'<div class="form-group"> ' +
							'<label class="col-md-4 control-label" for="altText">Alt Text</label> ' +
							'<div class="col-md-4"> ' +
							'<input id="altText" name="altText" type="text" placeholder="Alt Text" class="form-control input-md"> ' +
							'<span class="help-block">Enter the Alt Text</span> </div> ' +
							'</div> ' +
							'<div class="form-group"> ' +
							'<label class="col-md-4 control-label" for="textDecoration">How awesome is this?</label> ' +
							'<div class="col-md-4"> <div class="radio"> <label for="textDecoration-0"> ' +
							'<input type="radio" name="textDecoration" id="textDecoration-0" value="none" checked="checked"> ' +
							'None </label> ' +
							'</div><div class="radio"> <label for="textDecoration-1"> ' +
							'<input type="radio" name="textDecoration" id="textDecoration-1" value="underline"> Underline </label> ' +
							'</div> ' +
							'</div> </div>' +
							'</form> </div>  </div>',
							buttons: {
								success: {
									label: "Save",
									className: "btn-success",
									callback: function () {
										var url = $('#url').val();
										var altText = $("#altText").val()
										var textColor = $("#textColor").val()
										var textDecoration = $("input[name='textDecoration']:checked").val()

										// var replacementText = $("<p/>").append($(elem)).html();
										var replacementText = $("<p/>").append($(elem)).text();

										var sel, range;
										sel = iframe[0].contentDocument.defaultView.getSelection();
										if (sel.rangeCount) {
											range = sel.getRangeAt(0);
											range.deleteContents();

											newNode = document.createElement("a");

											newNode.href = url;
											newNode.target = "_blank";
											newNode.title = altText;
											newNode.style.color = textColor;
											newNode.style.textDecoration = textDecoration;

											newNode.appendChild(document.createTextNode(replacementText));

											// range.insertNode(document.createTextNode(replacementText));
											range.insertNode(newNode);
										}
									}
								}
							}
						}
					);


				} else {
					// $(editor).find('a').attr('target', '_blank');
					edit.execCommand(a, b, c);
				}


			};

			scope.edm.toggleFullScreen = function() {
				$("#fullScreenTButton").find("span").toggleClass("glyphicon-fullscreen glyphicon-resize-small");
				$(".jHtmlArea").toggleClass("fullScreen");
			};

			ngModel.$render = function () {
				edit.body.innerHTML = ngModel.$viewValue;
			};

    }
  }
});
