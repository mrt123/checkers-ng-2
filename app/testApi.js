var testApi = {
    mockAccount: function ($provide) {

        var account = {
            execSingUpCallback: undefined,
            execSignInCallback: undefined,
            signInOptions: undefined
        };
        
        $provide.value('account', {
            onSignUpSuccess: function (callback) {
                account.execSingUpCallback = callback;
            },
            onSignInSuccess: function (callback) {
                account.execSignInCallback = callback;
            },
            signIn: function (username, pasword, opts) {
                account.signInOptions = opts;
            },
            signOut: function (callback) {
                callback();
            }
        });
        
        return account;
    }
};