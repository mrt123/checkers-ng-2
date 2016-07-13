describe('facebook : ', function () {

    beforeEach(module('facebook',
        function ($provide) {

            $provide.value('AbstractAccount', function () {

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

        it('should execute onLoad callbacks when window.FacebookLoaded === true', inject(function (facebook, $interval, $window) {

            //ARRANGE
            var callback = sinon.spy();
            var window = {};

            // ACT
            facebook.checkLibStatus(callback);
            $interval.flush(100);
            expect(callback.callCount).toEqual(1);

            $window.FacebookLoaded = true;
            

            $interval.flush(200);

            // ASSERT
            expect(callback.callCount).toEqual(3);
            expect(callback.getCall(0).args).toEqual(['loaded']);
        }));
    });
}); 