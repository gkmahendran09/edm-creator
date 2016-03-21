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
      var container = this.container = $("<div/>").addClass("jHtmlArea").width(textarea.width()).insertAfter(textarea);

      var toolbar = this.toolbar = $("<div/>").addClass("ToolBar").appendTo(container);
      toolbar.html($compile('<div class="btn-group"> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'bold\', false, null);"> <span class="glyphicon glyphicon-bold"></span> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'italic\', false, null);"> <span class="glyphicon glyphicon-italic"></span> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'underline\', false, null);"> <u><b>U</b></u> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'strikeThrough\', false, null);"> <strike>S</strike> </button> <button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'strikeThrough\', false, null);"> <span class="glyphicon glyphicon-font"></span> </button> <div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="glyphicon glyphicon-text-color"></span> </button> <ul class="dropdown-menu"> <li> <a href="javascript:void(0);"> <input type="text" data-ng-model="edm.foreColor" colorpicker> </a> </li></ul> </div><div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="glyphicon glyphicon-text-background"></span> </button> <ul class="dropdown-menu"> <li> <a href="javascript:void(0);"> <input type="text" data-ng-model="edm.backColor" colorpicker> </a> </li></ul> </div><div class="btn-group"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="glyphicon glyphicon-link"></span> </button> <ul class="dropdown-menu"> <li> <a href="javascript:void(0);"> <input type="text" data-ng-model="edm.createLink"> </a> </li></ul> </div><button type="button" class="btn btn-default" data-ng-click="edm.formatSelection(\'unlink\', false, null);"> <span class="glyphicon glyphicon-remove"></span> </button> </div>')(scope));

      var iframe = this.iframe = $("<iframe/>").height(textarea.height());
      iframe.width(textarea.width());

      var htmlarea = this.htmlarea = $("<div/>").append(iframe);

      container.append(htmlarea).append(textarea.hide());

			var edit = this.editor = this.iframe[0].contentWindow.document;
      edit.designMode = 'on';
      edit.open();
      edit.write(ngModel.$viewValue);
      edit.close();

			scope.edm.formatSelection = function(a, b, c) {
				// iframe[0].contentWindow.focus();
				$(editor).find('a').attr('target', '_blank');
				editor.execCommand(a, b, c);

			};

			ngModel.$render = function () {
				editor.body.innerHTML = ngModel.$viewValue;
			};
    }
  }
});
