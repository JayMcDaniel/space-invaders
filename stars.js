function Star() {
    this.x = random(1, width);
    this.y = random(10, height);
    this.speed = random(2, 18);
    this.length = random(1, 7);


    this.show = function () {
        var whiteness = random(200, 255);
        noStroke();
        fill(whiteness);
        rect(this.x, this.y, 1, this.length);
    }

    this.move = function (star_x_direction, star_y_direction) {

      //  console.log(star_direction);
        if (this.y > height) {
            this.y = -10;
            this.x = random(1, width);
        } else {
            this.y += this.speed + star_y_direction;
            this.x += star_x_direction;
        }


    }
}