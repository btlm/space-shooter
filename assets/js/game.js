var game = new Phaser.Game(540, 800, Phaser.AUTO, 'game');

game.state.add('play', playState);
game.state.add('load', loadState);
game.state.add('win', winState);

game.state.start('load');