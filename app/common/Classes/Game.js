angular.module('Game', []).factory('Game', [
    'Board',
    'Pin',
    function (Board, Pin) {

        /**
         * Think of Game as a GameMaster :
         *  - it owns the board
         *  - makes rules).
         *  - does not allocates pins (board comes with pins pre allocated)
         */

        var Game = function () {
            this.board = new Board();
            this.pins = this.allocatePins(this.board.getFieldsByColor('black'));
            this.pinMap = this.generatePinMap(this.board.getFieldsByColor('black'));

        };

        Game.prototype.isMoveLegal = function (startField, newField) {
            //var startField = this.board.fields[startFieldNumber-1];
            //var newField = this.board.fields[newFieldNumber-1];
            var condition1 = startField.legalMoves.indexOf(newField.id) >= 0;
            var condition2 = this.getMappingForField(newField.id) === undefined;
            return condition1 && condition2;
        };

        Game.prototype.allocatePins = function (fields) {

            var pins = [];
            fields.forEach(function (field) {

                // PLAYER 1 fields
                if (field.id >= 41) {
                    var pin = new Pin('black', pins.length);
                    pins.push(pin);
                }

                // PLAYER 2 fields
                if (field.id <= 24) {
                    var pin = new Pin('white', pins.length);
                    pins.push(pin);
                }
            }.bind(this));
            return pins;
        };

        Game.prototype.getPins = function () {
            return this.pins;
        };

        Game.prototype.getPinById = function (id) {
            return this.pins.filter(function (pin) {
                return pin.id === id;
            })[0];
        };

        // MAPPINGS SECTION
        Game.prototype.generatePinMap = function (playableFields) {
            var pinMap = [];

            playableFields.forEach(function (field) {

                // PLAYER 1 fields
                if (field.id >= 41) {
                    pinMap.push({
                        pinId: pinMap.length,
                        fieldId: field.id
                    });
                }

                // PLAYER 2 fields
                if (field.id <= 24) {
                    pinMap.push({
                        pinId: pinMap.length,
                        fieldId: field.id
                    });
                }
            }.bind(this));

            return pinMap;

        };

        Game.prototype.getMappingForPin = function (pinId) {
            return this.pinMap.filter(function (mapping) {
                return mapping.pinId === pinId;
            })[0];
        };

        Game.prototype.getMappingForField = function (fieldId) {
            return this.pinMap.filter(function (mapping) {
                return mapping.fieldId === fieldId;
            })[0];
        };

        Game.prototype.updateMapping = function (pinId, fieldId) {

            for (var i = 0; i < this.pinMap.length; i++) {
                var mapping = this.pinMap[i];
                if (mapping.pinId === pinId) {
                    mapping.fieldId = fieldId;
                }
            }
        };

        Game.prototype.getFieldMappedToPin = function (pinId) {
            var mappingWithPin = this.getMappingForPin(pinId);
            return this.board.getFieldByNumber(mappingWithPin.fieldId);
        };

        return Game;
    }]);