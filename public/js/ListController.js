/**
 * Created by enrique.munguia on 8/4/16.
 */
angular.module("urlShort")
    .controller('ListController', function (urls, $scope, $location, Urls) {
        $scope.urls = urls.data;
        $scope.path = $location.protocol() + "://" + $location.host() + ":" + $location.port();

        $scope.addUrl = function () {
            if (!$scope.urlPath) {
                return;
            }
            var url = {
                urlPath: $scope.urlPath,
                delete: false
            };
            Urls.createUrl(url).then(function (doc) {
                $location.path("/");
                $scope.urls.push(doc.data);
            }, function (response) {
                alert(response);
            });

            $scope.urlPath = '';
        };

        $scope.toggleUrl = function (url) {
            console.log(url);
            Urls.editUrl(url);
        };

        $scope.clearCompleted = function () {
            var idsToDelete = $scope.urls.filter(function (url) {
                return url.delete;
            }).map(function (url) {
                return url._id;
            });
            idsToDelete.forEach(function (id) {
                Urls.deleteUrl(id);
            });
            $scope.urls = $scope.urls.filter(function (url) {
                return !url.delete;
            });
        };
    });