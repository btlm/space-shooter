var loadState = {
    preload: function() {
        game.load.image('background', 'assets/img/bg2.png');
        game.load.image('planet', 'assets/img/planet-bottom.png');
        game.load.image('rocket', 'assets/img/rocket.png');
        game.load.image('rock', 'assets/img/rock.png');
        game.load.image('bullet', 'assets/img/laser.png');

        game.load.image('rockParticle', 'assets/img/rockParticle.png');
        game.load.image('bulletParticle', 'assets/img/bulletParticle.png');
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('play');
        game.add.tileSprite(0, 0, 540, 800, 'background');
    }
};