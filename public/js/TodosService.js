/**
 * Created by enrique.munguia on 8/4/16.
 */
angular.module("urlShort")
    .service("Urls", function($http) {
        this.getUrls = function() {
            return $http.get("/urls").
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding urls.");
            });
        };
        this.getUrl = function(seqId) {
            var url = "/urls/" + seqId;
            return $http.get(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding this url.");
            });
        };
        this.createUrl = function (url) {
            return $http.post("/urls", url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error creating url.");
            });
        };
        this.editUrl = function (url) {
            var requestUrl = '/urls/' + url._id;
            return $http.put(requestUrl, url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error editing url.");
            });
        };

        this.deleteUrl = function (urlId) {
            var url = '/urls/' + urlId;
            return $http.delete(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error deleting url.");
            });
        }
    });