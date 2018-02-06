var menuState = {
    create: function() {
        game.add.text(100, 100, 'Wciśnij spację aby rozpocząć', {
            fill: '#ffff00'
        });

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.startGame, this);
    },

    update: function() {

    },

    startGame: function() {
        game.state.start('play');
    }
}