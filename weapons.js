var Bullet = function (x, y) {

    this.x = x;
    this.y = y;
    this.color = "rgb(248, 255, 158)";
    this.toRemove = false;

    this.show = function () {
        fill(this.color);
        rect(this.x, this.y, 5, 15);

    }


    this.move = function () {
        this.y -= 15;

        if (this.y < 0) {
            this.toRemove = true;
        }

    }


    this.hits = function (aliens) {
        for (var i = 0; i <= aliens.length - 1; i++) {
            var d = dist(this.x, this.y, aliens[i].x, aliens[i].y);

            if (d < 65) {
                aliens[i].health--;

                hud.updateScore(10);
                this.toRemove = true;

                explosions.push(new Explosion(this.x, this.y, random(2, 10), random(30, 150), "rgb(255, 255, 0)"));


                if (aliens[i].health < 1) {
                    aliens[i].toRemove = true;
                    hud.updateScore(50);
                }
            }
        }
    }

}




var Bomb = function (x, y) {

    this.x = x;
    this.y = y;
    this.color = "rgb(248, 255, 158)";
    this.toRemove = false;

    this.show = function () {
        fill("rgb(255, 51, 51)");
        ellipse(this.x, this.y, 15, 15);

    }


    this.move = function () {
        this.y -= 10;

        if (this.y < 0) {
            this.toRemove = true;
        }

    }


    this.hits = function (aliens) {
        for (var i = 0; i <= aliens.length - 1; i++) {
            var d = dist(this.x, this.y, aliens[i].x, aliens[i].y);

            if (d < 65) {
                aliens[i].health-=4;

                hud.updateScore(40);
                this.toRemove = true;

                explosions.push(new Explosion(this.x, this.y, random(50, 100), random(30, 250)));

                if (aliens[i].health < 1) {
                    aliens[i].toRemove = true;
                    hud.updateScore(50);
                }
            }
        }
    }

}