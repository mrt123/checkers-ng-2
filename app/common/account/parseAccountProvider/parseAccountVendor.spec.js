describe('parseAccountVendor : ', function () {

    beforeEach(module('parseAccountVendor',
        function ($provide) {

            $provide.value('AbstractAccount', function () {
                return {
                    executeCallbacks: function () {
                    },
                    executeLoginSuccessCallbacks: function () {
                    },
                    executeSignUpSuccessCallbacks: function () {
                    }
                }
            });
        }
    ));

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

    describe('signUp()', function () {

        it('runs success arg function, and executes signUp success callbacks.', inject(function (parseAccountVendor, $window) {

                //ARRANGE
                parseAccountVendor.getUsername = function () {
                };
                $window.Parse = {
                    User: {
                        signUp: function (username, password, user, opts) {
                            opts.success({
                                email: "xxx@zz.com",
                                playerName: 'playerName',
                                getUsername: function () {
                                    return "xxx@zz.com";
                                },
                                get: function () {
                                    return 'playerName';
                                }
                            });
                        }
                    }
                };
                var callback = sinon.spy();
                parseAccountVendor.executeSignUpSuccessCallbacks = sinon.spy(parseAccountVendor.executeSignUpSuccessCallbacks);

                // ACT
                parseAccountVendor.signUp('username', 'password', 'playerName', {
                    success: callback
                });

                // ASSERT
                expect(callback.calledOnce).toEqual(true);
                expect(callback.getCall(0).args).toEqual([{
                    email: "xxx@zz.com",
                    playerName: 'playerName'
                }]);
                expect(parseAccountVendor.executeSignUpSuccessCallbacks.calledOnce).toEqual(true);
                expect(parseAccountVendor.executeSignUpSuccessCallbacks.getCall(0).args).toEqual([[{
                    email: "xxx@zz.com",
                    playerName: 'playerName'
                }]]);
            })
        );
    });

    describe('signIn()', function () {

        it('runs success arg function, and executes signIn success callbacks.', inject(function (parseAccountVendor, $window) {

                //ARRANGE
                parseAccountVendor.getUsername = function () {
                };
                $window.Parse = {
                    User: {
                        logIn: function (username, password, opts) {
                            opts.success({
                                email: "xxx@zz.com",
                                playerName: 'playerName',
                                getUsername: function () {
                                    return "xxx@zz.com";
                                },
                                get: function () {
                                    return 'playerName';
                                }
                            });
                        }
                    }
                };
                var callback = sinon.spy();
                parseAccountVendor.executeLoginSuccessCallbacks = sinon.spy(parseAccountVendor.executeLoginSuccessCallbacks);

                // ACT
                parseAccountVendor.signIn('username', 'password', {
                    success: callback
                });

                // ASSERT
                expect(callback.calledOnce).toEqual(true);
                expect(callback.getCall(0).args).toEqual([{
                    email: "xxx@zz.com",
                    playerName: 'playerName'
                }]);
                expect(parseAccountVendor.executeLoginSuccessCallbacks.calledOnce).toEqual(true);
                expect(parseAccountVendor.executeLoginSuccessCallbacks.getCall(0).args).toEqual([[{
                    email: "xxx@zz.com",
                    playerName: 'playerName'
                }]]);
            })
        );
    });

    describe('signOut()', function () {

        it('calls success argument upon successful logout.', inject(function (parseAccountVendor, $window) {

                //ARRANGE
                $window.Parse = {
                    initialize: sinon.spy(),
                    User: {
                        logOut: function () {
                            return {
                                then : function(success) {
                                    success();
                                }
                            }
                        }
                    }
                };
                var success = sinon.spy();

                
                // ACT
                parseAccountVendor.signOut(success);

                // ASSERT
                expect(success.calledOnce).toEqual(true);
            })
        );
    });

    describe('getUser()', function () {

        it('returns Parse user.', inject(function (parseAccountVendor, $window) {

                //ARRANGE
                $window.Parse = {
                    initialize: sinon.spy(),
                    User: {
                        current: function () {
                            return {
                                email: "xxx@zz.com",
                                playerName: 'playerName',
                                getUsername: function () {
                                    return "xxx@zz.com";
                                },
                                get: function () {
                                    return 'playerName';
                                }
                            }
                        }
                    }
                };


                // ACT
                var result = parseAccountVendor.getUser();

                // ASSERT
                expect(result).toEqual(
                    {
                        email: "xxx@zz.com",
                        playerName: 'playerName'
                    });
            })
        );
    });
}); 