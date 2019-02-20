var alien_img;
var alien_img2;
var alien_img3;
var alien_img4;
var alien_images = [];
var ship_img;
var extra_life_img;
var bomb_img;
var extra_life_recieved = false;
var bomb_recieved = false;
var ship;
var HUD;
var shoot_sound;
var intro_sound;
var explosion_sound_1;
var explosion_sound_2;
var bomb_sound;
var powerup_sound;
var aliens = [];
var bullets = [];
var enemy_bullets = [];
var explosions = [];
var power_ups = [];
var level;
var score;
var high_score = 0;
var lives;
var stars = [];
var star_x_direction = 0;
var star_y_direction = 0;
var num_stars = 30;
var game_over = false;



function preload() {
    alien_img = loadImage('images/alien1.png');
    alien_img2 = loadImage('images/alien2.png');
    alien_img3 = loadImage('images/alien3.png');
    alien_img4 = loadImage('images/alien4.png');
    alien_images = [alien_img, alien_img2, alien_img3, alien_img4];
    ship_img = loadImage('images/ship2.png');
    extra_life_img = loadImage('images/extra_life.png');
    bomb_img = loadImage('images/bomb1.png');
    shoot_sound = loadSound('sounds/gun_fire.mp3');
    intro_sound = loadSound('sounds/aliens.mp3');
    explosion_sound_1 = loadSound('sounds/explosion_1.mp3');
    explosion_sound_2 = loadSound('sounds/explosion_2.mp3');
    bomb_sound = loadSound('sounds/bomb.mp3');
    crash_sound = loadSound('sounds/crash.mp3');
    powerup_sound = loadSound('sounds/power_up.mp3');
    shoot_sound.setVolume(0.5);
    intro_sound.setVolume(0.3);
    explosion_sound_1.setVolume(0.8);
    crash_sound.setVolume(0.8);
    powerup_sound.setVolume(0.8);

}


function setup() {

    game_over = false;
    level = 1;
    score = 0;
    lives = 3;
    aliens = [];
    stars = [];
    createCanvas(1260, 700);
    ship = new Ship(ship_img);
    hud = new HUD(level, score, lives);

    //make stars
    for (i = 0; i <= num_stars; i++) {
        stars.push(new Star);
    }

    newLevel(level, intro_sound);

}


function draw() {

    background(0);
    hud.show();


    stars.forEach(function (star) {
        star.show();
        star.move(star_x_direction, star_y_direction);
    });


    //explosions
    for (var i = explosions.length - 1; i >= 0; i--) {
        explosions[i].show();
    }

    for (var i = explosions.length - 1; i >= 0; i--) {
        if (explosions[i].toRemove) {
            explosions.splice(i, 1);
        }
    }

    //ship
    ship.show();
    ship.move();
    if (!ship.toRemove) {
        ship.hits(aliens); //check if hit 
    } else { //ship has been recently hit

        for (i = enemy_bullets.length - 1; i > -1; i--) { //remove bullets
            enemy_bullets[i].y = height + 10;
        }

        if (hud.lives > 0) {
            resetLevel(intro_sound);
        } else {
            game_over = true;
        }

    }



    //aliens
    for (var i = aliens.length - 1; i >= 0; i--) {

        aliens[i].move();
        aliens[i].show();

        if (aliens[i].isShooter) {
            if (random(1, 110 - level) < 2) {
                aliens[i].shoot(enemy_bullets);
            }
        }


        if (aliens[i].hitsWall()) {
            aliens[i].changeDir();
        }

        if (aliens[i].toRemove === true) {
            i % 2 == 0 ? explosion_sound_1.play() : explosion_sound_2.play();
            aliens.splice(i, 1);

            //start new level
            if (aliens.length < 1) {
                level++;
                newLevel(level, intro_sound);
            }

        }

    }



    //bullets
    for (var i = bullets.length - 1; i >= 0; i--) {

        bullets[i].show();
        bullets[i].move();
        bullets[i].hits(aliens);

    }

    for (var i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].toRemove) {
            bullets.splice(i, 1);
        }
    }

    //enemy bullets
    for (var i = enemy_bullets.length - 1; i >= 0; i--) {
        enemy_bullets[i].show();
        enemy_bullets[i].move();
        enemy_bullets[i].hits(ship);

    }

    for (var i = enemy_bullets.length - 1; i >= 0; i--) {
        if (enemy_bullets[i].toRemove) {
            enemy_bullets.splice(i, 1);
        }
    }



    //place powerups
    if (power_ups.length < 1 && level % 4 == 0 && !extra_life_recieved) { //extra life
        power_ups.push(new ExtraLife(random(10, width - 10), random(10, height - 10), extra_life_img));
        extra_life_recieved = true;
    }
    if (power_ups.length < 1 && level % 3 == 0 && !bomb_recieved) { //bomb
        power_ups.push(new BombPowerup(random(10, width - 10), random(10, height - 10), bomb_img));
        bomb_recieved = true;
    }

    for (var i = power_ups.length - 1; i >= 0; i--) {

        power_ups[i].show();
        power_ups[i].move();
        power_ups[i].hits(ship);

    }

    for (var i = power_ups.length - 1; i >= 0; i--) {
        if (power_ups[i].toRemove) {
            power_ups.splice(i, 1);
        }
    }

}


//controls
function keyPressed() {

    if ((keyCode == "32" || keyCode == "16") && !game_over) { //spacebar or shift shoots
        ship.shoot(bullets);
        shoot_sound.play();
    }

    if (keyCode === LEFT_ARROW) {
        ship.setXDir(-1);
        star_x_direction = 1;
    } else if (keyCode === RIGHT_ARROW) {
        ship.setXDir(1);
        star_x_direction = -1;
    } else if (keyCode === UP_ARROW) {
        ship.setYDir(-1);
        star_y_direction = 1;
    } else if (keyCode === DOWN_ARROW) {
        ship.setYDir(1);
        star_y_direction = -1;
    } else if (keyCode === 13 && game_over) {
        setup();
    } else if (keyCode === 192) { //tilde kills all aliens
        aliens.forEach(function (alien) {
            alien.toRemove = true;
        });
    } else if (keyCode === 27) { //esc kills ship
        ship.toRemove = true;
        hud.updateLives(-1);
    }


}


function keyReleased() {
    if (keyCode != " " && !keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
        ship.setXDir(0);
        star_x_direction = 0;
    }

    if (keyCode != " " && !keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)) {
        ship.setYDir(0);
        star_y_direction = 0;
    }

}