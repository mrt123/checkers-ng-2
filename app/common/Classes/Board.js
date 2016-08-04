angular.module('Board', []).factory('Board', [
    'Field',
    'Pin',
    function (Field, Pin) {

        var Board = function () {
            this.fields = this.generateFields();
        };

        Board.prototype.generateFields = function () {
            var fields = [];

            for (var i = 1; i <= 64; i++) {  // iterate to produce 64 squares
                var rowNumber = Math.ceil(i / 8);
                var column = i - ( (rowNumber - 1) * 8);
                fields.push(new Field(i, rowNumber, column));
            }
            return fields;
        };

        Board.prototype.getFieldsByColor = function (color) {
            return this.fields.filter(function (field) {
                return field.getColor() === color;
            });
        };

        Board.prototype.getFieldByNumber = function (number) {
            return this.fields.filter(function (field) {
                return field.id === number;
            })[0];
        };

        Board.prototype.getFieldAtXY = function (x, y) {
            var snapThreshold = 25;

            for (var i = 0; i < this.fields.length; i++) {
                var field = this.fields[i];
                if (
                    this.isNumberWithin(field.center.x, x, snapThreshold) &&
                    this.isNumberWithin(field.center.y, y, snapThreshold)
                ) {
                    return field;
                }
            }
            return null;
        };

        Board.prototype.isNumberWithin = function (number, target, threshold) {
            // TODO: belongs to util class

            return Math.abs(number - target) < threshold;
        };

        return Board;
    }]);