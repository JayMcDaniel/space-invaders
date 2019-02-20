var EnemyBullet = function (x, y, type) {

    this.x = x;
    this.y = y;
    this.color = type === "blue_disk" ? "rgb(51, 204, 255)" : "rgb(255, 0, 102)";
    this.toRemove = false;
    this.r = type === "blue_disk" ? 15 : 5;
    this.speed = type === "blue_disk" ? 3 : 7;
    this.type = type;



    this.show = function () {

        if (type === "blue_disk") {
            fill("rgb(51, 204, 255)");
            ellipse(this.x, this.y, 15, 15);
        } else if ("pink_laser") {
            fill("rgb(255, 0, 102)");
            rect(this.x, this.y, 2, 30);
        }

    }


    this.move = function () {
        this.y += this.speed;

        if (this.y > height) {
            this.toRemove = true;
        }

    }


    this.hits = function (ship) {

        var p = {
            x: this.x,
            y: this.y
        };
        

        if (utils.pointInTriangle(p, ship.p0, ship.p1, ship.p2) && !ship.toRemove) {
            ship.toRemove = true;
            this.toRemove = true;

            hud.updateLives(-1);
            crash_sound.play();
            explosions.push(new Explosion(this.x, this.y, random(2, 100), random(30, 500)));

        }

    }

}