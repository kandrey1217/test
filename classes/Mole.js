class Mallet {
    //Mallet's constructor
    constructor(img, sz) {
        /*this.image_mallet_class = loadImage(img);*/  //creates PImage object and assigns it to image
        this.w = sz;  //assigns sz to Mallet variable w
        this.h = int(sz * 1.5);  //calculates the Mallet's height and assigns it to h
    }
}

class Mole {
    //Mole's constructor
    constructor(img, img2, x, y, sz, scl) {
        //this.mole_img = loadImage(img);  //creates PImage object and assigns it to mole_img
        //this.hill_img = loadImage(img2);  //creates PImage object and assigns it to mole_img
        //this.pos = new PVector(x, y);  //creates PVector with x, y parameters and assigns it to pos
        this.x = x;
        this.y = y;
        this.size = int(sz * scl);  //calculates the Mole's size and assigns it to size
        this.scale = scl;  //assigns scl parameter to Mole variable scale

        this.display_timer = int(random(2 * frameRate, 5 * frameRate));  //initializes the display_timer
        this.respawn_timer = int(random(1 * frameRate, 3 * frameRate));  //initializes the respawn_timer

        this.mallet = new Mallet("mallet.png", 90);  //creates Mallet object and assigns it to mallet

        //randomly initializes alive to true or false
        if (int(random(2)) == 0) {  //if random number is 0
            this.alive = false;  //Mole is dead
        }
        else {  //if random number is 1
            this.alive = true;  //Mole is alive
            ++score.total_moles;  //increments Score object's total_moles variable
        }
    }

    //changes the state of the Mole
    update() {
        if (this.respawn_timer == 0) {  //if it's time for the Mole to be respawned
            this.alive = true;  //respawns the Mole
            reset_respawn_timer();  //resets the respawn_timer
            reset_display_timer();  //resets the display_timer
            ++score.total_moles;  //increments the Score object's total_moles variable
        }
        --this.respawn_timer;  //decrements the respawn_timer
    }

    //displays the Mole
    show() {
        if (this.alive && this.display_timer > 0) {  //if Mole is alive and display_timer hasn't run out
            image(mole_img, this.x, this.y, this.size, this.size);  //displays mole_image at pos.x, pos.y, scaling it to size, size
            --this.display_timer;  //decrements the display_timer
        }
        else {  //if Mole is dead or display_timer ran out
            image(hill_img, this.x, this.y, this.size, this.size);  //displays hill_img at pos.x, pos.y, scaling it to size, size
        }
    }

    //called when Mole is hit
    hit() {
        if (this.alive && mouse_over()) {  //if Mole is alive and mouse cursor is over its hitbox
            this.alive = false;  //Mole is dead
            reset_respawn_timer();  //resets the respawn_timer

            //displays mallet.image at mouseX, mouseY - mallet.h / 4, scaling it to mallet.w * scale, mallet.h * scale
            image(mallet_img, mouseX, mouseY - mallet.h / 4,
                mallet.w * this.scale, mallet.h * this.scale);

            score.mole_hit();  //adds points to score for hitting a Mole
            score.reaction_bonus(display_timer);  //adds points to score based on reaction time
            ++score.moles_hit;  //increments Score object's moles_hit variable
        }
    }

    //resets the respawn_timer
    reset_respawn_timer() {
        //assigns a random number to the respawn_timer
        this.respawn_timer = int(random(3 * frameRate, 5 * frameRate));
    }

    //resets the display_timer
    reset_display_timer() {
        //assigns a random number to the display_timer
        this.display_timer = int(random(2 * frameRate, 4 * frameRate));
    }

    //removes the Mole
    hide() {
        this.alive = false;  //Mole is dead
    }

    //determines whether or not the mouse cursor is over the Mole
    mouse_over() {
        //if mouse cursor is over the Mole's hitbox, returns true
        if (mouseX > this.x && mouseX < this.x + this.size &&
            mouseY > this.y && mouseY < this.y + this.size)
            return true;
        //if mouse cursor is not over the Mole's hitbox, returns false
        return false;
    }
}