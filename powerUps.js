function ExtraLife(x, y, img) {

    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.toRemove = false;


    this.show = function () {
        if (!this.toRemove) {
            tint("rgb(255, 255, 0)");
            image(img, this.x, this.y);
        };

    }


    this.move = function () {
        this.y += this.speed;

        if (this.y > height - 10) {
            this.toRemove = true;
        }

    }

    this.hits = function (ship) {

        var p = {
            x: this.x + 13,
            y: this.y + 13
        };

        if (utils.pointInTriangle(p, ship.p0, ship.p1, ship.p2) && !ship.toRemove) {
            this.toRemove = true;
            powerup_sound.play();
            hud.updateLives(1);
        }
    }

}



function BombPowerup(x, y, img) {

    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.toRemove = false;


    this.show = function () {
        if (!this.toRemove) {
            noTint();
            image(img, this.x, this.y);

        };

    }


    this.move = function () {
        this.y += this.speed;

        if (this.y > height - 10) {
            this.toRemove = true;
        }

    }

    this.hits = function (ship) {

        var p = {
            x: this.x + 13,
            y: this.y + 13
        };

        if (utils.pointInTriangle(p, ship.p0, ship.p1, ship.p2) && !ship.toRemove) {

            this.toRemove = true;
            powerup_sound.play();
            ship.bombs += 10;
            hud.updateBombs(10);
        }
    }

}