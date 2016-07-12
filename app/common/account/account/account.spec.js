fdescribe('account : ', function () {

    var execFacebookLoad;

    beforeEach(module('account',
        function ($provide) {
            $provide.value('facebook', {
                onLoad: function (callback) {
                    execFacebookLoad = callback;
                },
                onLogin: function (callback) {

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
                init: function () { },
                signUp: function () { },
                signIn: function () { },
                getUser: function () { },
                getUsername: function () { },
                onSignUpSuccess: function () { },
                onSignInSuccess: function () { }
            });
        }
    ));

    describe('activate()', function () {

        it('Reacts to Facebook library load status.', inject(function (account, parseAccountVendor) {


            //ARRANGE
            var accountVendorStub = sinon.stub(parseAccountVendor);
            
            // ACT
            execFacebookLoad('loaded');
            
            // ASSERT
            expect(accountVendorStub.signIn.args[0][0]).toEqual('mmm@zz.com');
            expect(accountVendorStub.signIn.args[0][1]).toEqual(123);
        }));
    });
}); 