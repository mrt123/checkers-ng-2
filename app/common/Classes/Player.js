angular
    .module('Player', [])
    .factory('Player', Player);

function Player() {

    class Player {
        constructor(name, email, color, startRow) {
            this.name = name;
            this.email = email;
            this.color = color;
            this.startRow = _setStartRow(startRow);
        }

        // TODO: _setStartRow is WIP for  ? 
        _setStartRow(startRow) {
            var allowedStartRows = [1, 8];
            if (startRow === allowedStartRows[0] || startRow === allowedStartRows[1]) {
                this.startRow = startRow;
            }
            else {
                throw new Error('start row number must equal 1 or 8');
            }
        }
    }

    return Player;
}
