function Explosion(x, y, start_size, end_size, color) {

    this.x = x;
    this.y = y;
    this.d = start_size;
    this.end_size = end_size;
    this.alpha = 255;
    this.color = color || "rgb(255, 0, 0)";
    this.toRemove = false;

    this.show = function () {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.d);
        this.d += 12;
        if (this.d >= this.end_size) {
            this.toRemove = true;
        }


    }

}