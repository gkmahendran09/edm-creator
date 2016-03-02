angular.module('app.filters', ['ngSanitize']).filter('trustAsHtml', trustAsHTMLFilter);

angular.module('app.filters').filter('assetURL', assetURLFilter);

angular.module('app.filters').filter('basename', basenameFilter);

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
