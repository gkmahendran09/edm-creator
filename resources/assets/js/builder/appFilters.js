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
var count = 0;
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
