describe('facebook : ', function () {

    beforeEach(module('facebook'));

    describe('checkLibStatus()', function () {

        it('should notify libStatus each 100ms while lib is not loaded', inject(function (facebook, $interval, $window) {

            //ARRANGE
            $window.FacebookLoaded = false;
            var notify = sinon.spy();
            facebook.libStatus.promise.then(undefined, undefined, notify);

            // ACT
            $interval.flush(300);

            // ASSERT
            expect(notify.callCount).toEqual(3);
            expect(notify.getCall(0).args).toEqual(['loading']);
        }));

        it('should notify libStatus when lib failed to load', inject(function (facebook, $interval, $window) {

            //ARRANGE
            $window.FacebookLoaded = false;
            var notify = sinon.spy();
            facebook.libStatus.promise.then(undefined, undefined, notify);

            // ACT
            $interval.flush(facebook.MAX_LIB_LOAD_TIME_MS);

            // ASSERT
            expect(notify.getCall(49).args).toEqual(['failed']);
        }));

        it('should stop executing callbacks after lib is loaded', inject(function (facebook, $interval, $window) {

            //ARRANGE
            $window.FacebookLoaded = false;
            var notify = sinon.spy();
            facebook.libStatus.promise.then(undefined, undefined, notify);

            // ACT
            $window.FacebookLoaded = true;
            $interval.flush(600);

            // ASSERT
            expect(notify.callCount).toEqual(1);
        }));

        it('should notify libStatus, when window.FacebookLoaded is true', inject(
            function (facebook, $interval, $window) {

                //ARRANGE
                $window.FacebookLoaded = false;
                var notify = sinon.spy();
                facebook.libStatus.promise.then(undefined, undefined, notify);


                // ACT
                $interval.flush(100);
                $window.FacebookLoaded = true;
                $interval.flush(500);


                // ASSERT
                expect(notify.callCount).toEqual(2);
                expect(notify.getCall(0).args).toEqual(['loading']);
                expect(notify.getCall(1).args).toEqual(['loaded']);
            }));
    });

    describe('login()', function () {

        it('notifies user/token promise', inject(function (facebook, $window, $rootScope) {
            //ARRANGE
            $window.FB = {
                login: function (callback) {
                    callback({token: 'xxx'});
                },
                api: function (x, y, callback) {
                    callback({fbUser: 'zzz'});
                }
            };
            var notifyUser = sinon.spy();
            var notifyToken = sinon.spy();
            facebook.user.promise.then(undefined, undefined, notifyUser);
            facebook.authToken.promise.then(undefined, undefined, notifyToken);

            // ACT
            facebook.login();
            $rootScope.$apply();

            // ASSERT
            expect(notifyUser.callCount).toEqual(1);
            expect(notifyUser.getCall(0).args).toEqual([{fbUser: 'zzz'}]);
            expect(notifyToken.callCount).toEqual(1);
            expect(notifyToken.getCall(0).args).toEqual([{token: 'xxx'}]);
        }));
        
        it('returns user', inject(function (facebook, $window, $rootScope) {
            //ARRANGE
            $window.FB = {
                login: function (callback) {
                    callback({token: 'xxx'});
                },
                api: function (x, y, callback) {
                    callback({fbUser: 'zzz'});
                }
            };
            var result = undefined;

            // ACT
            facebook.login().then(function(r) {
                result = r;
            });
            $rootScope.$apply();

            // ASSERT
            expect(result).toEqual({fbUser: 'zzz'});
        }));
    });

    describe('logout()', function () {

        it('notifies user/token promises, when logout succeeded.', inject(function (facebook, $window, $rootScope) {

                //ARRANGE
                $window.FB = {
                    logout: function (callback) {
                        callback('facebook response');
                    }
                };
                var notifyUser = sinon.spy();
                var notifyToken = sinon.spy();
                facebook.user.promise.then(undefined, undefined, notifyUser);
                facebook.authToken.promise.then(undefined, undefined, notifyToken);

                // ACT
                facebook.logOut();
                $rootScope.$apply();

                // ASSERT
                expect(notifyToken.callCount).toEqual(1);
                expect(notifyToken.getCall(0).args).toEqual(['facebook response']);
                expect(notifyUser.callCount).toEqual(1);
                expect(notifyUser.getCall(0).args).toEqual([undefined]);
            })
        );

        it('does not notify user/token promises, when logout fails.', inject(function (facebook, $window, $rootScope) {

                //ARRANGE
                $window.FB = {
                    logout: function () {
                        throw new Error();
                    }
                };
                var notifyUser = sinon.spy();
                var notifyToken = sinon.spy();
                facebook.user.promise.then(undefined, undefined, notifyUser);
                facebook.authToken.promise.then(undefined, undefined, notifyToken);

                // ACT
                facebook.logOut();
                $rootScope.$apply();

                // ASSERT
                expect(notifyToken.callCount).toEqual(0);
                expect(notifyUser.callCount).toEqual(0);
            })
        );
    });

    describe('tryFetchUserData()', function () {

        it('notifies user/token promises, when FB user is connected.', inject(function (facebook, $window, $rootScope) {

            //ARRANGE
            $window.FB = {
                getLoginStatus: function (callback) {
                    callback({status: 'connected'});
                },
                api: function (x, y, callback) {
                    callback({fbUser: 'zzz'});
                }
            };
            
            var notifyUser = sinon.spy();
            var notifyToken = sinon.spy();
            facebook.user.promise.then(undefined, undefined, notifyUser);
            facebook.authToken.promise.then(undefined, undefined, notifyToken);

            // ACT
            facebook.tryFetchUserData();
            $rootScope.$apply();

            // ASSERT
            expect(notifyToken.callCount).toEqual(1);
            expect(notifyToken.getCall(0).args).toEqual([{status: 'connected'}]);
            expect(notifyUser.callCount).toEqual(1);
            expect(notifyUser.getCall(0).args).toEqual([{fbUser: 'zzz'}]);
        }));

        it('notifies user/token promises, when FB user is NOT connected.', inject(function (facebook, $window, $rootScope) {

            //ARRANGE
            $window.FB = {
                getLoginStatus: function (callback) {
                    callback({status: 'unknown'});
                },
                api: function (x, y, callback) {
                    callback({fbUser: 'zzz'});
                }
            };

            var notifyUser = sinon.spy();
            var notifyToken = sinon.spy();
            facebook.user.promise.then(undefined, undefined, notifyUser);
            facebook.authToken.promise.then(undefined, undefined, notifyToken);

            // ACT
            facebook.tryFetchUserData();
            $rootScope.$apply();

            // ASSERT
            expect(notifyToken.callCount).toEqual(1);
            expect(notifyToken.getCall(0).args).toEqual([{status: 'unknown'}]);
            expect(notifyUser.callCount).toEqual(1);
            expect(notifyUser.getCall(0).args).toEqual([undefined]);
        }));
    });
}); 