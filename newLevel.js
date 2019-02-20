function newLevel(level, intro_sound) {

    hud.updateLevel(level);
    extra_life_recieved = bomb_recieved = false;

    enemy_bullets.forEach(function (enemy_bullet) {
        enemy_bullet.toRemove = true;
    });

    setTimeout(function () {
        var num_aliens = 2 + (Math.ceil(level * 1.5));
        if(num_aliens > 30){
            num_aliens = 30;
        }
        
        var x_speed = 6 + (Math.ceil(level / 3));
        if(x_speed > 15){
            x_speed = 15;
        }
        
        intro_sound.play();



        var image_index = 0;
        for (var i = 0, x_count = 0, y_count = 1; i < num_aliens; i++) {

            if (image_index > alien_images.length -1) {
                image_index = 0;
            }
            var health = 1 + random(1, Math.ceil(level / 2));

            if (x_count > 10) {
                x_count = 0;
                y_count++;
            }

            x_count++;
            var x = x_count * 100;
            var y = y_count * 80;


            aliens[i] = new Alien(alien_images, x, y, image_index, health, x_speed); //(alien_images, x, y, image_index, health)

            image_index++;
        }

    }, 500);



}