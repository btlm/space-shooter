var playState = {
    create: function() {
        game.add.tileSprite(0, 0, 540, 800, 'background');
        game.add.tileSprite(0, 700, 540, 100, 'planet');

        this.player = game.add.sprite(239, 616, 'rocket');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.bounce.setTo(1, 1);
        this.player.body.collideWorldBounds = true;

        this.cursors = game.input.keyboard.createCursorKeys();

        this.targets = game.add.group();
        this.targets.enableBody = true;

        this.targets.create(150, 100, 'rock');
        this.targets.create(150, 200, 'rock');
        this.targets.create(150, 300, 'rock');
        this.targets.create(150, 400, 'rock');
        this.targets.create(330, 100, 'rock');
        this.targets.create(330, 200, 'rock');
        this.targets.create(330, 300, 'rock');
        this.targets.create(330, 400, 'rock');

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);

        this.fireRate = 100;
        this.nextFire = 0;

        this.emitter = game.add.emitter(0, 0, 100);
        this.emitter.makeParticles('rockParticle');
        this.emitter.gravity = 200;

        this.bulletParticler = game.add.emitter(0, 0, 100);
        this.bulletParticler.makeParticles('bulletParticle');
        this.bulletParticler.gravity = 50;

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function() {
        game.physics.arcade.collide(this.bullets, this.targets, this.bulletCollideCallback, null, this);
        if (this.cursors.left.isDown) {
            // this.player.body.velocity.x -= 10;
            this.player.body.x -= 10;
        }

        if (this.cursors.right.isDown) {
            // this.player.body.velocity.x += 10;
            this.player.body.x += 10;
        }

        if (this.cursors.up.isDown) {
            // this.player.body.velocity.x -= 10;
        }

        if (this.cursors.down.isDown) {
            // this.player.body.velocity.x += 10;
        }

        if (game.input.activePointer.isDown) {
            this.fire();
        }

        this.spaceKey.onDown.add(this.fire, this);
        // game.time.events.loop(Phaser.Timer.SECOND * 2, this.createRock, this);

        if (this.targets.countLiving() <= 0) {
            game.state.start('win');
        }
    },

    fire: function() {
        if (game.time.now > this.nextFire && this.bullets.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.player.body.x + 31, this.player.body.y - 20);
            game.physics.arcade.moveToXY(bullet, this.player.body.x + 31, 0, 800);
        }
    },

    bulletCollideCallback: function(bullet, rock) {
        this.emitter.x = rock.x + rock.body.width/2;
        this.emitter.y = rock.y + rock.body.height/2;
        this.emitter.start(true, 2000, null, 20);

        this.bulletParticler.x = bullet.x + bullet.body.width/2;
        this.bulletParticler.y = bullet.y;
        this.bulletParticler.start(true, 1000, null, 20);

        bullet.kill();
        rock.kill();
    }
};