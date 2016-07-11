fdescribe('AbstractAccount : ', function () {

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
            expect(accountUnderTest.logInSuccessCallbacks, []);

            var callback1 = function() {
                console.log('xxxxx', JSON.stringify(arguments));
            };
            
            
            
            var callback1 = sinon.spy();
            var callback2 = sinon.spy();
            var stubbedFunction = sinon.stub({
                someCallback: function() {}
            });

            accountUnderTest.addOnSignUpCallback(callback1);
            accountUnderTest.addOnSignUpCallback(callback2);

            // ACT
            accountUnderTest.executeSignUpSuccessCallbacks([1,2,3]);

            // ASSERT
            expect(callback1.calledWith({ 0: 1, 1: 2, 2: 3 }));
            //expect(callback2.calledWith).toEqual([1,2,3]);
        }));
    });



}); 