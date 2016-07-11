describe('LoginCtrl : ', function () {

    var controller;
    var execFacebookLogin;
    var mockAccount;
    var $scope = {};


    beforeEach(module('app.LoginCtrl', function ($provide) {
        mockAccount = testApi.mockAccount($provide);

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

        it('Reacts to successful login.', inject(function ($state) {

            //ARRANGE
            var stateStub = sinon.stub($state);

            // ACT
            $scope.login('email', 'password');
            mockAccount.signInOptions.success();

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