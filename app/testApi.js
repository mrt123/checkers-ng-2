var testApi = {
    mockAccount: function ($provide) {

        var account = {
            execSingUpCallback: undefined,
            login: {},
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
                return {
                    then: function (resolve, reject) {
                        account.login = {
                            resolve: resolve,
                            reject: reject
                        }
                    }
                };
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