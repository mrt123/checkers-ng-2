angular
    .module('app.NavBarCtrl', [])
    .controller('NavBarCtrl', NavBarCtrl);

function NavBarCtrl(account, $scope, facebook, $timeout, $log) {
    var vm = this;
    vm.loggedIn = false;
    vm.logout = logout;

    activate();

    function logout() {
        account.signOut().then(function () { 
            updateAccountScope({}, false);
        });
    }

    // PRIVATE METHODS
    function activate() {
        facebook.checkLibStatus(reactToFacebookLoadStatus);
        facebook.onLoad(reactToFacebookLoad);
        account.onSignUpSuccess(reactToUserPresence);
        account.onSignInSuccess(reactToUserPresence);
    }

    function reactToFacebookLoadStatus(status){
        vm.FBLoadStatus = status;
    }
    
    function reactToFacebookLoad() {
        facebook.getLoginStatus(reactToFacebookStatus);
    }
    
    function reactToFacebookStatus(status) { 
        if(status === 'connected') {
            reactToFacebookConnected();
        }
    }

    function reactToFacebookConnected() {
        facebook.getUser().then(signFacebookUserIntoAccount);
    }
    
    function signFacebookUserIntoAccount(facebookUser) {
        account.signIn(facebookUser.email, facebookUser.id, {
            success: undefined, 
            fail: createAccountForFacebookUser.bind(undefined, facebookUser)
        });
    }

    function createAccountForFacebookUser(facebookUser) {
        account.signUp(facebookUser.email, facebookUser.id, facebookUser.name);
    }
    
    function reactToUserPresence(user) {
        updateAccountScope(user, true);
    }

    function updateAccountScope(user, logged) {
        $timeout(function () { // avoid existing digest
            vm.username = user.playerName;
            vm.loggedIn = logged;
        });
    }
}