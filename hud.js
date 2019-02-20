function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function HUD(level, score, lives) {

    this.level = level;
    this.score = score;
    this.lives = lives;
    this.bombs = 0;
    this.score_multiplier = 1;
    this.color = "rgb(0, 102, 153)";

    this.show = function () {
        fill(this.color);
        textSize(32);
        text("lives: " + this.lives, width - 120, 40);

        text("score: " + this.score, 20, 40);
        text("bombs: " + this.bombs, 20, 80);
        fill("rgb(248, 255, 158)");
        text("level: " + this.level, width / 2 - 80, 40);



        if (game_over) {
            
            this.updateHighScore();
            
            fill("rgb(248, 255, 158)");
            textSize(64);
            text("Game Over", width / 2 - 180, height / 2 - 40);
            fill(this.color);
            textSize(32);
            text("Hit 'return' to play again", width / 2 - 180, height / 2 + 10);
            text("High Score: " + high_score, width / 2 - 180, height / 2 + 60);
        }

    }

    this.updateScore = function (points) {
        var old_score = Number(this.score.toString().replace(",", ""));
        old_score += (points * this.score_multiplier);

        this.score = addCommas(old_score);

    }

    this.updateLevel = function (level) {
        this.level = level;
    }

    this.updateLives = function (mod) {
        this.lives += mod;
    }

    this.updateBombs = function (mod) {
        this.bombs += mod;
    }

    this.updateHighScore = function () {
  
        if (Number(this.score.toString().replace(",", "")) > Number(high_score.toString().replace(",", ""))) {
            high_score = addCommas(this.score);
        }
    }


}