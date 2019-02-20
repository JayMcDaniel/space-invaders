var Ship = function (img) {

    this.x = width / 2;
    this.y = height - 80;
    this.x_dir = 0;
    this.y_dir = 0;
    this.speed = 10;
    this.bombs = 0;
    this.toRemove = false;
    this.p0 = {
        x: this.x,
        y: this.y + 80
    };
    this.p1 = {
        x: this.x + 40,
        y: this.y
    };
    this.p2 = {
        x: this.x + 80,
        y: this.y + 80
    };


    this.show = function () {
        tint("rgb(255,255,255)");
        if (!this.toRemove) {
            image(img, this.x, this.y);
            fill("rgb(255, 204, 255)");

            this.p0 = {
                x: this.x,
                y: this.y + 80
            };
            this.p1 = {
                x: this.x + 40,
                y: this.y
            };
            this.p2 = {
                x: this.x + 80,
                y: this.y + 80
            };

            //  triangle(this.p0.x, this.p0.y, this.p1.x, this.p1.y, this.p2.x, this.p2.y);

        };

    }


    this.move = function () {
      
        this.x += this.x_dir * this.speed;
        this.y += this.y_dir * this.speed;

        if (this.x + 40 > width) {
            this.x = width - 40;
        }
        if (this.x < 0 - 40) {
            this.x = -40;
        }
        if (this.y > height - 80) {
            this.y = height - 80;
        }
        if (this.y < 30) {
            this.y = 30;
        }
    }


    this.setXDir = function (x_dir) {
        this.x_dir = x_dir;
    }

    this.setYDir = function (y_dir) {
        this.y_dir = y_dir;
    }

    this.setSpeed = function (speed) {
        this.speed = speed;
    }

    this.shoot = function (bullets) {

        if (ship.bombs > 0) {

            bullets.push(new Bomb(this.x + 40, this.y));
            ship.bombs--;
            hud.updateBombs(-1);
        } else {
            bullets.push(new Bullet(this.x + 40, this.y));
        }


    }


    //crashes into an alien and dies

    this.hits = function (aliens) {
        for (var i = 0; i <= aliens.length - 1; i++) {
            var d = dist(this.x, this.y, aliens[i].x, aliens[i].y);

            if (d < 65) {

                this.toRemove = true;

                hud.updateLives(-1);
                crash_sound.play();
                explosions.push(new Explosion(this.x, this.y, random(2, 100), random(30, 500)));

            }
        }
    }



}