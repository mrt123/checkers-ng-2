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

    describe('login()', function () {

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

    describe('logout()', function () {

        it('executes onLogOutCallbacks and callback argument upon successful FB logout.', inject(function (facebook, $window) {

                //ARRANGE
                var executeCallbacks = sinon.stub(facebook, 'executeCallbacks');
                $window.FB = {
                    logout: function (callback) {
                        callback('facebook response');
                    }
                };
                var callback = sinon.spy();
                

                // ACT
                facebook.logOut(callback);

                // ASSERT
                expect(executeCallbacks.callCount).toEqual(1);
                expect(executeCallbacks.getCall(0).args).toEqual([facebook.onLogOutCallbacks]);
                expect(callback.getCall(0).args).toEqual(['facebook response']);
            })
        );
    });

    describe('getUser()', function () {

        it('returns and resolves promise when FB.api() is successful.', inject(function (facebook, $window, $rootScope) {

                //ARRANGE
                $window.FB = {
                    api: function (arg1, arg2, callback) {
                        callback({ mickyMouse: 1 });
                    }
                };

                // ACT
                var result = facebook.getUser();
                $rootScope.$apply();

                // ASSERT
                expect(result.$$state.value).toEqual({ mickyMouse: 1 }); 
            })
        );

        it('returns and rejects promise when FB.api() return error.', inject(function (facebook, $window, $rootScope) {

                //ARRANGE
                $window.FB = {
                    api: function (arg1, arg2, callback) {
                        callback({ error: 1 });
                    }
                };

                // ACT
                var result = facebook.getUser();
                $rootScope.$apply();

                // ASSERT
                expect(result.$$state.status).toEqual(2);
            })
        );

        it('returns and rejects promise when FB.api() return no response.', inject(function (facebook, $window, $rootScope) {

                //ARRANGE
                $window.FB = {
                    api: function (arg1, arg2, callback) {
                        callback();
                    }
                };

                // ACT
                var result = facebook.getUser();
                $rootScope.$apply();

                // ASSERT
                expect(result.$$state.status).toEqual(2);
            })
        );
    });

    describe('getLoginStatus()', function () {
        
        it('returns and rejects promise when FB.api() return no response.', inject(function (facebook, $window) {

                //ARRANGE
                $window.FB = {
                    getLoginStatus: function (callback) {
                        callback({ status: 33 });
                    }
                };
                var functionSpy = sinon.spy();

                // ACT
                facebook.getLoginStatus(functionSpy);

                // ASSERT
                expect(functionSpy.getCall(0).args).toEqual([33]);
            })
        );
    });
}); 