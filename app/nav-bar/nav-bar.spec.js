describe('NavBarCtrl : ', function () {

    var controller;
    var execFacebookLoaded;
    var mockAccount;

    beforeEach(module('app.NavBarCtrl', function ($provide) {
        mockAccount = testApi.mockAccount($provide);
        $provide.value('facebook', {
            checkLibStatus: function (callback) {
                execFacebookLoaded = callback;
            }
        });
    }));

    beforeEach(function() {
        inject(function ($controller) {
            var $scope = {};
            controller = $controller('NavBarCtrl', {$scope: $scope});
        })
    });

    describe('vm.logout()', function () {
        
        it('Sets vm.logout to false on vm.logout().', inject(function ($timeout) {
            
            //ARRANGE
            controller.loggedIn = true;
        
            // ACT
            controller.logout();
            $timeout.flush();
        
            // ASSERT
            expect(controller.loggedIn).toEqual(false);
            expect(controller.username).toEqual(undefined);
        }));
    });

    describe('activate()', function () {

        it('Reacts to Facebook library load status.', inject(function () {
        
            //ARRANGE
            expect(controller.FBLoadStatus).toEqual(undefined);
        
            // ACT
            execFacebookLoaded('loaded');
        
            // ASSERT
            expect(controller.FBLoadStatus).toEqual('loaded');
        }));

        it('Reacts to user presence after SingUp.', inject(function ($controller, $timeout) {
        
            //ARRANGE
            expect(controller.loggedIn).toEqual(false);
            expect(controller.username).toEqual(undefined);
        
            // ACT
            mockAccount.execSingUpCallback({ playerName: 'PlayerName'}, true);
            $timeout.flush();
        
            // ASSERT
            expect(controller.loggedIn).toEqual(true);
            expect(controller.username).toEqual('PlayerName');
        }));

        it('Reacts to user presence after SingIn.', inject(function ($controller, $timeout) {
        
            //ARRANGE
            expect(controller.loggedIn).toEqual(false);
            expect(controller.username).toEqual(undefined);
        
            // ACT
            mockAccount.execSignInCallback({ playerName: 'PlayerName'}, true);
            $timeout.flush();
        
            // ASSERT
            expect(controller.loggedIn).toEqual(true);
            expect(controller.username).toEqual('PlayerName');
        }));
    });
});