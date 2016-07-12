describe('account : ', function () {

    var execFacebookLoad;
    var execFacebookLogin;

    beforeEach(module('account',
        function ($provide) {

            $provide.value('facebook', {
                onLoad: function (callback) {
                    execFacebookLoad = callback;
                },
                onLogin: function (callback) {
                    execFacebookLogin = callback;
                },
                getLoginStatus: function (callback) {
                    callback('connected');
                },
                getUser: function () {
                    return {
                        then: function (callback) {
                            callback({
                                email: 'mmm@zz.com',
                                id: 123
                            });
                        }
                    };
                }
            });

            $provide.value('parseAccountVendor', {
                init: function () {
                },
                signUp: function () {
                },
                getUser: function () {
                },
                getUsername: function () {
                },
                onSignUpSuccess: function () {
                },
                onSignInSuccess: function () {
                }
            });
        }
    ));

    describe('activate()', function () {

        describe('facebook onLoad', function () {

            it('Sign-in facebook user into native account when facebook user is logged.', inject(function (account, parseAccountVendor) {

                //ARRANGE
                var singInOptions = null;
                parseAccountVendor.signIn = function (email, id, opts) {
                    singInOptions = opts;
                };
                var accountSignIn = sinon.spy(parseAccountVendor, 'signIn');

                // ACT
                execFacebookLoad();

                // ASSERT
                expect(accountSignIn.getCall(0).args).toEqual(['mmm@zz.com', 123, singInOptions]);
            }));

            it('Sign-up facebook user for a native account when facebook user is logged, but has no native account.', inject(function (account, parseAccountVendor) {

                //ARRANGE
                parseAccountVendor.signIn = function (email, id, opts) {
                    opts.fail();
                };
                var accountSignUp = sinon.stub(parseAccountVendor, 'signUp');

                // ACT
                execFacebookLoad();

                // ASSERT
                expect(accountSignUp.getCall(0).args).toEqual(['mmm@zz.com', 123, undefined]);
            }));

        });

        describe('facebook onLogin', function () {

            it('Sign-in facebook user into native account when facebook user is logged.', inject(function (account, parseAccountVendor) {

                //ARRANGE
                var singInOptions = null;
                parseAccountVendor.signIn = function (email, id, opts) {
                    singInOptions = opts;
                };
                var accountSignIn = sinon.spy(parseAccountVendor, 'signIn');

                // ACT
                execFacebookLogin();

                // ASSERT
                expect(accountSignIn.getCall(0).args).toEqual(['mmm@zz.com', 123, singInOptions]);
            }));

            it('Sign-up facebook user for a native account when facebook user is logged, but has no native account.', inject(function (account, parseAccountVendor) {

                //ARRANGE
                parseAccountVendor.signIn = function (email, id, opts) {
                    opts.fail();
                };
                var accountSignUp = sinon.stub(parseAccountVendor, 'signUp');

                // ACT
                execFacebookLogin();

                // ASSERT
                expect(accountSignUp.getCall(0).args).toEqual(['mmm@zz.com', 123, undefined]);
            }));
        });

        describe('signOut()', function () {

            it('LogOut facebook user and native user.', inject(function (account, parseAccountVendor, facebook) {

                //ARRANGE
                parseAccountVendor.signOut = function (callback) {
                    callback();
                };
                var accountLogOut = sinon.spy(parseAccountVendor, 'signOut');

                facebook.logOut = function () {
                };
                var facebookLogOut = sinon.spy(facebook, 'logOut');


                // ACT
                account.signOut();

                // ASSERT
                expect(facebookLogOut.calledOnce).toEqual(true);
                expect(accountLogOut.calledOnce).toEqual(true);
            }));
        });
    });
}); 