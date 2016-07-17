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

        fit('runs success arg function, and executes signUp success callbacks.', inject(function (parseAccountVendor, $window) {

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
                        },
                        current: function () {
                            return {
                                getUsername: function () {
                                },
                                get: function () {
                                }
                            }
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
}); 