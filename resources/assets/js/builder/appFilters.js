var filter = angular.module('app.filters', ['ngSanitize']).filter('trustAsHtml', trustAsHTMLFilter);

function trustAsHTMLFilter($sce) {
  return $sce.trustAsHtml;
}
