var testApi = {
    mockAccount: function ($provide) {

        var account = {
            execSingUpCallback: undefined,
            login: {},
            register: {},
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
            signUp: function (username, pasword, playerName) {
                return {
                    then: function (resolve, reject) {
                        account.register = {
                            resolve: resolve,
                            reject: reject
                        }
                    }
                };
            },
            signOut: function (callback) {
                callback();
            }
        });

        return account;
    }
};