describe('facebook : ', function () {

    beforeEach(module('facebook',
        function ($provide) {

            $provide.value('AbstractAccount', function () {
                return {
                    executeCallbacks: function () {
                    }
                }
            });
        }
    ));

    fdescribe('checkLibStatus()', function () {

        it('should call callback each 100ms regardless of lib status', inject(function (facebook, $interval) {

            //ARRANGE
            var callback = sinon.spy();

            // ACT
            facebook.checkLibStatus(callback);
            $interval.flush(300);

            // ASSERT
            expect(callback.callCount).toEqual(3);
            expect(callback.getCall(0).args).toEqual(['loading']);
        }));

        it('should stop executing callbacks after lib is loaded', inject(function (facebook, $interval, $window) {

            //ARRANGE
            var callback = sinon.spy();

            // ACT
            facebook.checkLibStatus(callback);
            $window.FacebookLoaded = true;
            $interval.flush(600);

            // ASSERT
            expect(callback.callCount).toEqual(1);
        }));

        it('should execute onLoad callbacks when window.FacebookLoaded === true', inject(
            function (facebook, $interval, $window, AbstractAccount) {

                //ARRANGE
                var executeCallbacksSpy = sinon.stub(facebook, 'executeCallbacks');
                var call1 = function () {
                };
                var call2 = function () {
                };
                facebook.onLoadCallbacks.push(call1, call2);


                // ACT
                facebook.checkLibStatus(function () {
                });
                $interval.flush(100);
                $window.FacebookLoaded = true;
                $interval.flush(100);


                // ASSERT
                expect(executeCallbacksSpy.getCall(0).args).toEqual([[call1, call2]]);
            }));
    });
}); 