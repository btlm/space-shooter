var winState = {
    create: function() {
        this.bg = game.add.tileSprite(0, 0, 540, 800, 'background');
        game.add.tileSprite(0, 700, 540, 100, 'planet');

        var bar = game.add.graphics();
        bar.beginFill(0x000000, 0.7);
        bar.drawRect(0, 0, 540, 800);

        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        text = game.add.text(0, 0, "Wygrana! [Wcisnij spacje :D]", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.8)', 2);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        text.setTextBounds(0, 0, 540, 800);

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.restartGame, this);
    },

    restartGame: function() {
        game.state.start('play');
    }
}