describe('LoginCtrl : ', function () {

    var controller;
    var execFacebookLogin;
    var mockAccount;
    var $scope = {};


    beforeEach(module('app.SignUpCtrl', function ($provide) {
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
            controller = $controller('SignUpCtrl', {$scope: $scope});
        })
    });
    
    describe('scope.signUp', function () {

        it('Reacts to successful login.', inject(function ($state) {

            //ARRANGE
            var stateStub = sinon.stub($state);

            // ACT
            $scope.signUp('email', 'password');
            mockAccount.signUpOptions.success();

            // ASSERT
            expect(stateStub.go.calledWith('home')).toEqual(true);
        }));

        it('Reacts to failed login.', inject(function ($state, $timeout) {

            //ARRANGE

            // ACT
            $scope.signUp('xxx', 'xxx');
            mockAccount.signUpOptions.fail({}, {
                message: 'account failed to sign up'
            });

            $timeout.flush();

            // ASSERT
            expect($scope.error).toEqual('account failed to sign up');
        }));
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
}); 