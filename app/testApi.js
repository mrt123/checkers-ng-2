var testApi = {
    mockAccount: function ($provide, $q) {

        var account = {
            execSingUpCallback: undefined,
            execSignInCallback: undefined,
            signInOptions: undefined,
            signInSuccess: undefined,
            signInFail: undefined,
            signUpOptions: undefined
        };
        
        $provide.value('account', {
            onSignUpSuccess: function (callback) {
                account.execSingUpCallback = callback;
            },
            onSignInSuccess: function (callback) {
                account.execSignInCallback = callback;
            },
            signIn: function (username, pasword) {
                return $q(function(resolve) {
                    resolve({});
                });
            },
            signUp: function (username, pasword, playerName, opts) {
                account.signUpOptions = opts;
            },
            signOut: function (callback) {
                callback();
            }
        });
        
        return account;
    }
};