var testApi = {
    mockAccount: function ($provide) {

        var account = {
            execSingUpCallback: undefined,
            execSignInCallback: undefined
        };
        
        $provide.value('account', {
            onSignUpSuccess: function (callback) {
                account.execSingUpCallback = callback;
            },
            onSignInSuccess: function (callback) {
                account.execSignInCallback = callback;
            },
            signOut: function (callback) {
                callback();
            }
        });
        
        return account;
    }
};