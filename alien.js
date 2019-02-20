function Alien(alien_images, x, y, image_index, health, x_speed) {

    this.x = x;
    this.y = y;
    this.x_speed = x_speed;
    this.alien_images = alien_images;
    this.x_dir = 1;
    this.counter = 0;
    this.image_index = image_index;
    this.health = health;
    this.toRemove = false;
    this.tint = image_index < 2 ? "rgb(57,255,20)" : "rgb(255,255,255)";


    this.isShooter = (function () {
        return random(1, 8) < 2;
    })();


    if (this.isShooter) {
        this.tint = "rgb(51, 204, 255)";
    } else if (this.health > 7) {
        this.tint = "rgb(208, 32, 144)";
    } else if (this.health > 4) {
        this.tint = "rgb(204, 255, 0)";
    }




    this.show = function () {

        //color depending on health remaining

        if (this.health < 2) {
            this.tint = "rgb(255,8,0)";
        }

        tint(this.tint);

        image(alien_images[this.image_index], this.x, this.y);
    }


    this.move = function () {
        this.x += this.x_dir * x_speed;
        this.counter++;

        if (this.counter > 30) {
            this.counter = 0;
            this.switchImage(this.image_index);
        }

    }


    this.changeDir = function () {
        this.y += 60;
        this.x_dir *= -1;
        if (this.y + 30 > height) {
            this.y = 10
        }

    }

    this.hitsWall = function () {
        return this.x + 50 > width || this.x < 0;
    }

    this.switchImage = function (indx) {

        if (indx === 0) {
            this.image_index = 1;
        } else if (indx === 1) {
            this.image_index = 0;
        }

        if (indx === 2) {
            this.image_index = 3;
        } else if (indx === 3) {
            this.image_index = 2;
        }
    }


    this.shoot = function (enemy_bullets) {

        var type = this.image_index < 2 ? "blue_disk" : "pink_laser";

        enemy_bullets.push(new EnemyBullet(this.x + 25, this.y + 40, type));

    }


}