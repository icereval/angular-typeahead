'use strict';

angular.module('typeahead.directives', []);

angular.module('typeahead.directives', []).directive('ngTypeahead', function () {
    return {
        restrict: 'A',
        scope: {
            filter: '&',
            selectedItem: '='
        },
        link: function (scope, element, attrs) {
            element.typeahead({
                valueKey: attrs.valueKey,
                remote: {
                    url: attrs.url,
                    cache: false,
                    filter: function (parsedResponse) {
                        if (attrs.filter) {
                            return scope.filter({ parsedResponse: parsedResponse });
                        }

                        return parsedResponse;
                    }
                },
            });

            scope.$watch('selectedItem', function (newValue) {
                if (newValue === '') {
                    element.typeahead('setQuery', '');
                }
            }, true);

            element.on('typeahead:selected', function (event, datum, dataset) {
                scope.selectedItem = datum;
                scope.$apply();
            });

            element.on('typeahead:autocompleted', function (event, datum, dataset) {
                scope.selectedItem = datum;
                scope.$apply();
            });

            scope.$on('$destroy', function () {
                element.typeahead('destroy');
            });
        }
    };
});
