angular.module("urlShort")
    .controller('RedirectController', function ($scope, $window, $location, $routeParams, Urls) {
        var currentId = $routeParams.id;
        var seqId = ShortURL.decode(currentId);
        Urls.getUrl(seqId).then(function (doc) {
            var url = doc.data[0];
            if (url) {
                $window.location.href = url.urlPath;
            } else {
                $location.path("/");
            }
        }, function (response) {
            alert(response);
        });
    });