angular.module('urlShort', ['ngRoute'])
    .config(($routeProvider) => {
      $routeProvider
            .when('/', {
              templateUrl: 'list.html',
              controller: 'ListController',
              resolve: {
                urls(Urls) {
                  return Urls.getUrls();
                }
              },
            })
            .when('/go/:id', {
              templateUrl: 'redirecting.html',
              controller: 'RedirectController',
            })
            .otherwise({
              redirectTo: '/',
            });
    });
