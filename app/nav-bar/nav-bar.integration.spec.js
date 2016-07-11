xdescribe('NavBarCtrl : ', function () {  // TODO : remove this skipped test
    beforeEach(module('app'));

    var controller;

    beforeEach(inject(function ($controller, _$q_) {
        var $scope = {};
        controller = $controller('NavBarCtrl', {$scope: $scope});
    }));

    describe('vm.logout()', function () {

        it('Sets vm.logout to false on vm.logout().', inject(function ($q, $rootScope, $timeout) {

            //ARRANGE
            var deferredParseLogOut = $q.defer();
            window.Parse['User'].logOut = function () {
                return deferredParseLogOut.promise;
            };
            window.FB = {
                logout: function (callback) {
                    callback();
                }
            };
            controller.loggedIn = true;

            // ACT
            controller.logout();
            deferredParseLogOut.resolve();
            $rootScope.$apply();   // Propagate promise resolution to 'then' functions using $apply().
            $timeout.flush();

            // ASSERT
            expect(controller.loggedIn).toEqual(false);
            expect(controller.username).toEqual(undefined);
        }));
    });

    describe('activate()', function () {

        it('Reacts to Facebook library load status.', inject(function ($controller, $interval) {

            //ARRANGE
            window.FacebookLoaded = false;
            expect(controller.FBLoadStatus).toEqual(undefined);

            // ACT
            $interval.flush(200);   // 200ms forward

            // ASSERT
            expect(controller.FBLoadStatus).toEqual('loading');


            // ACT
            mockFacebookLoaded($interval);

            // ASSERT
            expect(controller.FBLoadStatus).toEqual('loaded');
        }));

        it('Reacts to user presence.', inject(function ($controller, $interval, account, $rootScope, $timeout) {

            //ARRANGE
            mockFacebookLoaded($interval);

            // ACT
            mockUserPresent(account);

            // ASSERT
            $rootScope.$apply();   // Propagate promise resolution to 'then' functions using $apply().
            $timeout.flush();

            // ASSERT
            expect(controller.loggedIn).toEqual(true);
            expect(controller.username).toEqual('PlayerName');
        }));

        function mockUserPresent(account) {

            var vendorUser = {
                getUsername: function () {
                    return 'Mickey@Mouse.com'
                },
                get: function () {
                    return 'PlayerName'
                }
            };
            
            window.Parse['User'].logIn = function (username, password, options) {
                options.success(vendorUser);
            };
            
            account.signIn('MickeyMouse', 'password', {
                success: function () {
                }
            });
        }

        function mockFacebookLoaded($interval) {
            window.FB.getLoginStatus = function (callback) {
                callback('undefined');
            };
            window.FacebookLoaded = true;
            $interval.flush(200);
        }
    });
});