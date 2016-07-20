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

    describe('register()', function () {

        it('executes signUp success callbacks.', inject(function (parseAccountVendor, $window, $q, $rootScope) {

                //ARRANGE
                mockVendorRegister($window, $q);
                parseAccountVendor.executeSignUpSuccessCallbacks = sinon.spy(parseAccountVendor.executeSignUpSuccessCallbacks);

                // ACT
                parseAccountVendor.signUp('username', 'password', 'playerName');
                $rootScope.$apply();
                

                // ASSERT
                expect(parseAccountVendor.executeSignUpSuccessCallbacks.calledOnce).toEqual(true);
                expect(parseAccountVendor.executeSignUpSuccessCallbacks.getCall(0).args).toEqual([[{
                    email: "xxx@zz.com",
                    playerName: 'playerName'
                }]]);
            })
        );
    });

    describe('login()', function () {

        it('executes signIn success callbacks.', inject(function (parseAccountVendor, $window, $q, $rootScope) {

                mockVendorUserLogin($window, $q);
                parseAccountVendor.executeLoginSuccessCallbacks = sinon.spy(parseAccountVendor.executeLoginSuccessCallbacks);

                // ACT
                parseAccountVendor.signIn('username', 'password');
                $rootScope.$apply();
                

                // ASSERT
                expect(parseAccountVendor.executeLoginSuccessCallbacks.calledOnce).toEqual(true);
                expect(parseAccountVendor.executeLoginSuccessCallbacks.getCall(0).args).toEqual([[{
                    email: "xxx@zz.com",
                    playerName: 'playerName'
                }]]);
            })
        );

        it('returns user', inject(function (parseAccountVendor, $window, $q, $rootScope) {

                //ARRANGE
                mockVendorUserLogin($window, $q);

                // ACT
                var resultPromise = parseAccountVendor.signIn('username', 'password');
                var resolvedValue = undefined;
                resultPromise.then(function(value) { resolvedValue = value; });
                $rootScope.$apply();
                
                
                // ASSERT
                expect(resolvedValue).toEqual({
                    email: "xxx@zz.com",
                    playerName: 'playerName'
                });
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
    
    function mockVendorUserLogin($window, $q) {
        $window.Parse = {
            User: {
                logIn: function () {
                    return $q(function(resolve) {
                        resolve({
                            getUsername: function () {
                                return "xxx@zz.com";
                            },
                            get: function () {
                                return 'playerName';
                            }
                        });
                    });
                }
            }
        };
    }
    
    function mockVendorRegister($window, $q) {
        $window.Parse = {
            User: {
                signUp: function () {
                    return $q(function(resolve) {
                        resolve({
                            getUsername: function () {
                                return "xxx@zz.com";
                            },
                            get: function () {
                                return 'playerName';
                            }
                        });
                    });
                }
            }
        };
    }
}); 