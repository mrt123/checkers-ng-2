describe('AbstractAccount : ', function () {

    beforeEach(module('AbstractAccount'));
    
    describe("addOnSignUpCallback", function () {
        it("adds signUp callback", inject(function (AbstractAccount) {
            // ARRANGE
            var accountUnderTest = new AbstractAccount('testedAccount');
            expect(accountUnderTest.signUpSuccessCallbacks, []);
            
            // ACT
            accountUnderTest.addOnSignUpCallback(1);
            
            // ASSERT
            expect(accountUnderTest.signUpSuccessCallbacks).toEqual([1]);;
        }));
    });
    
    describe("addOnLoginCallback", function () {
        it("adds login callback", inject(function (AbstractAccount) {
            // ARRANGE
            var accountUnderTest = new AbstractAccount('testedAccount');
            expect(accountUnderTest.logInSuccessCallbacks, []);

            // ACT
            accountUnderTest.addOnLoginCallback(1);
            
            // ASSERT
            expect(accountUnderTest.logInSuccessCallbacks).toEqual([1]);
        }));
    });

    describe("executeSignUpSuccessCallbacks", function () {
        it("executes sign up callbacks", inject(function (AbstractAccount) {
            // ARRANGE
            var accountUnderTest = new AbstractAccount('testedAccount');
            var callback1 = sinon.spy();
            var callback2 = sinon.spy();

            accountUnderTest.addOnSignUpCallback(callback1);
            accountUnderTest.addOnSignUpCallback(callback2);

            // ACT
            accountUnderTest.executeSignUpSuccessCallbacks([1,2,3]);

            // ASSERT
            expect(callback1.calledWith({ 0: 1, 1: 2, 2: 3 }));
            expect(callback2.calledWith({ 0: 1, 1: 2, 2: 3 }));
        }));
    });

    describe("executeLoginSuccessCallbacks", function () {
        it("executes login callbacks", inject(function (AbstractAccount) {
            // ARRANGE
            var accountUnderTest = new AbstractAccount('testedAccount');
            var callback1 = sinon.spy();
            var callback2 = sinon.spy();

            accountUnderTest.addOnLoginCallback(callback1);
            accountUnderTest.addOnLoginCallback(callback2);

            // ACT
            accountUnderTest.executeLoginSuccessCallbacks([1,2,3]);

            // ASSERT
            expect(callback1.calledWith({ 0: 1, 1: 2, 2: 3 }));
            expect(callback2.calledWith({ 0: 1, 1: 2, 2: 3 }));
        }));
    });
}); 