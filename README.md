# Angular-Typeahead

An simple AngularJS directive for Twitter's [Typeahead.js](https://github.com/twitter/typeahead.js) and [Bootstrap 2/3 RC1](http://getbootstrap.com/) which supports an `remote dataset` object array, `filter` and `selectedItem`.

## Usage

1. Download the latest version [here](https://github.com/icereval/angular-typeahead), and add `angular-typeahead.js` to your HTML `<head>`, **after** `angular.js` is included.

    ```html
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="underscore.js"></script>
    <script type="text/javascript" src="angular.js"></script>
    <script type="text/javascript" src="angular-typeahead.js"></script>
    ```

2. Add a typeahead element to your view.

    ```html
    <input type="text" class="form-control" filter="onFilter(parsedResponse)" selected-item="selectedItem" url="api/person/?name=%QUERY" value-key="name" ng-typeahead>
    ```

3. Implement the directive in your controller.

    ```javascript
    $scope.people = Person.query();
    
    $scope.onAdd = function () {
        if (_.isObject($scope.selectedItem)) {
            var exists = _.find($scope.people, function (person) {
                return person.id === $scope.selectedItem.id;
            });
    
            if (!exists) {
                $scope.people.push($scope.selectedItem);
            }
    
            // a blank string will tell the control to clear/reset.
            $scope.selectedItem = '';
        }
    };

    $scope.onFilter = function (parsedResponse) {
        // Remove any users already in the person list.
        return _.filter(parsedResponse, function (item) {
            return !_.find($scope.people, function (person) {
                return person.id === item.id;
            });
        });
    };
    
    $scope.onSave = function () {
        // ...
    };
    ```

## Changelog

#### 0.5.x

Initial release!
