describe('facebook : ', function () {

    beforeEach(module('facebook',
        function ($provide) {

            $provide.value('AbstractAccount', function () {
                return {
                    executeCallbacks: function () {
                    },
                    executeLoginSuccessCallbacks: function () {
                    }
                }
            });
        }
    ));

    describe('checkLibStatus()', function () {

        it('should call callback each 100ms while lib is not loaded', inject(function (facebook, $interval) {

            //ARRANGE
            var callback = sinon.spy();

            // ACT
            facebook.checkLibStatus(callback);
            $interval.flush(300);

            // ASSERT
            expect(callback.callCount).toEqual(3);
            expect(callback.getCall(0).args).toEqual(['loading']);
        }));

        it('should stop executing callbacks after lib is loaded', inject(function (facebook, $interval, $window) {

            //ARRANGE
            var callback = sinon.spy();

            // ACT
            facebook.checkLibStatus(callback);
            $window.FacebookLoaded = true;
            $interval.flush(600);

            // ASSERT
            expect(callback.callCount).toEqual(1);
        }));

        it('should execute onLoad callbacks once, when window.FacebookLoaded is true', inject(
            function (facebook, $interval, $window, AbstractAccount) {

                //ARRANGE
                var executeCallbacksSpy = sinon.stub(facebook, 'executeCallbacks');
                var call1 = function () {
                };
                var call2 = function () {
                };
                facebook.onLoadCallbacks.push(call1, call2);


                // ACT
                facebook.checkLibStatus(function () {
                });
                $interval.flush(100);
                $window.FacebookLoaded = true;
                $interval.flush(500);


                // ASSERT
                expect(executeCallbacksSpy.callCount).toEqual(1);
                expect(executeCallbacksSpy.getCall(0).args).toEqual([[call1, call2]]);
            }));
    });

    fdescribe('login()', function () {

        it('executes LoginSuccessCallbacks and callback argument upon successful FB login.', inject(function (facebook, $window) {

                //ARRANGE
                var loginSuccessCallbacks = sinon.stub(facebook, 'executeLoginSuccessCallbacks');
                $window.FB = {
                    login: function (callback) {
                        callback('facebook response');
                    }
                };
                var callback = sinon.spy();
                

                // ACT
                facebook.login(callback);

                // ASSERT
                expect(loginSuccessCallbacks.callCount).toEqual(1);
                expect(callback.getCall(0).args).toEqual(['facebook response']);
            })
        );

        it('calls FB login.', inject(function (facebook, $window) {

                //ARRANGE
                $window.FB = {
                    login: function () {  }
                };
                var FBLogin = sinon.spy($window.FB, 'login');
                

                // ACT
                facebook.login();

                // ASSERT
                expect(FBLogin.callCount).toEqual(1);
            })
        );
    });
}); 