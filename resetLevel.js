function resetLevel(intro_sound) {

    //when players crashes, remaining aliens respawn with health
    setTimeout(function () {
        intro_sound.play();
        
        for (var i = 0, x_count = 0, y_count = 1; i < aliens.length; i++) {

            var image_index = i % 2 == 0 ? 0 : 1;

            if (x_count > 10) {
                x_count = 0;
                y_count++;
            }

            x_count++;
            var x = x_count * 100;
            var y = y_count * 80;

            aliens[i].x = x;
            aliens[i].y = y;

        }

        ship.x = width / 2;
        ship.y = height - 80;
        ship.toRemove = false;

    }, 500);



}