describe('parseAccountVendor : ', function () {

    beforeEach(module('parseAccountVendor'));

    describe('init()', function () {

        it('initializes Parse library.', inject(function (parseAccountVendor, $window) {

                //ARRANGE
                $window.Parse = {
                    initialize: sinon.spy()
                };


                // ACT
                parseAccountVendor.init();

                // ASSERT
                expect($window.Parse.initialize.calledOnce).toEqual(true);
            })
        );
    });

    describe('register()', function () {

        it('returns vendor user, and notifies user promise when Parse.singUp is successful.', inject(function (parseAccountVendor, $window, $q, $rootScope) {

            //ARRANGE
            $window.Parse = {
                User: {
                    signUp: function (username, password, opts) {
                        return $q(function (resolve) {
                            resolve({
                                getUsername: function () {
                                    return username;
                                },
                                get: function () {
                                    return opts.playerName;
                                }
                            });
                        });
                    }
                }
            };

            var notifyUser = sinon.spy();
            parseAccountVendor.user.promise.then(undefined, undefined, notifyUser);
            var result = undefined;

            // ACT
            parseAccountVendor.signUp('xxx@zz.com', 'password', 'playerName').then(function (r) {
                result = r;
            });
            $rootScope.$apply();


            // ASSERT
            expect(result).toEqual({
                email: "xxx@zz.com",
                playerName: 'playerName'
            });
            expect(notifyUser.getCall(0).args).toEqual([{
                email: "xxx@zz.com",
                playerName: 'playerName'
            }]);
        }));

        it('rejects vendor user promise, and do NOT notify user promise when Parse singUp ha failed.', inject(function (parseAccountVendor, $window, $q, $rootScope) {

            //ARRANGE
            $window.Parse = {
                User: {
                    signUp: function () {
                        return $q(function (resolve, reject) {
                            reject();
                        });
                    }
                }
            };

            var notifyUser = sinon.spy();
            parseAccountVendor.user.promise.then(undefined, undefined, notifyUser);
            var result = undefined;

            // ACT
            parseAccountVendor.signUp('xxx@zz.com', 'password', 'playerName').then(function (r) {
                result = r;
            });
            $rootScope.$apply();


            // ASSERT
            expect(result).toEqual(undefined);
            expect(notifyUser.getCall(0)).toEqual(null);
        }));
    });

    describe('login()', function () {

        it('returns vendor user, and notifies user promise when Parse.logIn is successful.', inject(function (parseAccountVendor, $window, $q, $rootScope) {

            $window.Parse = {
                User: {
                    logIn: function (username, password) {
                        return $q(function (resolve) {
                            resolve({
                                getUsername: function () {
                                    return username;
                                },
                                get: function () {
                                    return 'playerName';
                                }
                            });
                        });
                    }
                }
            };
            var notifyUser = sinon.spy();
            parseAccountVendor.user.promise.then(undefined, undefined, notifyUser);
            var result = undefined;

            // ACT
            parseAccountVendor.signIn('xxx@zz.com', 'password').then(function (r) {
                result = r;
            });
            $rootScope.$apply();


            // ASSERT
            expect(result).toEqual({
                email: "xxx@zz.com",
                playerName: 'playerName'
            });
            expect(notifyUser.getCall(0).args).toEqual([{
                email: "xxx@zz.com",
                playerName: 'playerName'
            }]);
        }));

        it('rejects vendor user promise, and do NOT notify user promise when Parse singUp ha failed.', inject(function (parseAccountVendor, $window, $q, $rootScope) {

            //ARRANGE
            $window.Parse = {
                User: {
                    logIn: function () {
                        return $q(function (resolve, reject) {
                            reject();
                        });
                    }
                }
            };

            var notifyUser = sinon.spy();
            parseAccountVendor.user.promise.then(undefined, undefined, notifyUser);
            var result = undefined;

            // ACT
            parseAccountVendor.signIn('xxx@zz.com', 'password').then(function (r) {
                result = r;
            });
            $rootScope.$apply();


            // ASSERT
            expect(result).toEqual(undefined);
            expect(notifyUser.getCall(0)).toEqual(null);
        }));
    });

    describe('signOut()', function () {
        
        it('returns empty promise, and notifies user promise.', inject(function (parseAccountVendor, $window, $q, $rootScope) {

            $window.Parse = {
                User: {
                    logOut: function (username, password) {
                        return $q(function (resolve, reject) {
                            resolve();
                        });
                    }
                }
            };
            var notifyUser = sinon.spy();
            parseAccountVendor.user.promise.then(notifyUser);
            var result = undefined;

            // ACT
            parseAccountVendor.signOut().then(function (r) {
                result = r;
            });
            $rootScope.$apply();


            // ASSERT
            expect(result).toEqual(undefined);
            expect(notifyUser.getCall(0)).toEqual(null);
        }));

    });
}); 