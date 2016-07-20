describe('LoginCtrl : ', function () {

    var controller;
    var execFacebookLogin;
    var mockAccount;
    var $scope = {};


    beforeEach(module('app.LoginCtrl', function ($provide) {

        inject(function($q){
            mockAccount = testApi.mockAccount($provide, $q);
        });
        
        $provide.value('facebook', {
            login: function (callback) {
                execFacebookLogin = callback;
            }
        });

        $provide.value('$state', {
            go: function () {
            }
        });
    }));

    beforeEach(function () {
        inject(function ($controller) {
            controller = $controller('LoginCtrl', {$scope: $scope});
        })
    });

    describe('scope.loginWithFacebook', function () {

        it('Reacts to successful facebook login.', inject(function ($state) {

            //ARRANGE
            var stateStub = sinon.stub($state);

            // ACT
            $scope.loginWithFacebook();
            execFacebookLogin();

            // ASSERT
            expect(stateStub.go.calledWith('home')).toEqual(true);
        }));
    });  
    
    
    describe('scope.login', function () {

        fit('Reacts to successful login.', inject(function ($state, $q, $rootScope) {

            //ARRANGE
            var stateStub = sinon.stub($state);

            // ACT
            $scope.login('email', 'password');
            $rootScope.$apply();

            // ASSERT
            expect(stateStub.go.calledWith('home')).toEqual(true);
        }));

        it('Reacts to failed login.', inject(function ($state, $timeout) {

            //ARRANGE

            // ACT
            $scope.login('xxx', 'xxx');
            mockAccount.signInOptions.fail({}, {
                message: 'account failed to login'
            });

            $timeout.flush();

            // ASSERT
            expect($scope.error).toEqual('account failed to login');
        }));
    });
}); 