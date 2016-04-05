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
