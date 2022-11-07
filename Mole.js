class Mole {
    PImage mole_img;  //declares PImage mole_img
    PImage hill_img;  //declares PImage hill_img

    PVector pos;  //declares PVector pos
    int size;  //declares int size
    float scale;  //declares float scale
  boolean alive;  //declares boolean alive

int respawn_timer;  //declares int respawn_timer
int display_timer;  //declares int display_timer

Mallet mallet;  //declares Mallet mallet

//defines nested class Mallet
class Mallet {
    PImage image;  //declares PImage image
    int w;  //declares int w
    int h;  //declares int h

    //Mallet's constructor
    Mallet(String img, int sz) {
        image = loadImage(img);  //creates PImage object and assigns it to image
        w = sz;  //assigns sz to Mallet variable w
        h = int(sz * 1.5);  //calculates the Mallet's height and assigns it to h
    }
}

//Mole's constructor
Mole(String img, String img2, float x, float y, float sz, float scl) {
    mole_img = loadImage(img);  //creates PImage object and assigns it to mole_img
    hill_img = loadImage(img2);  //creates PImage object and assigns it to mole_img
    pos = new PVector(x, y);  //creates PVector with x, y parameters and assigns it to pos
    size = int(sz * scl);  //calculates the Mole's size and assigns it to size
    scale = scl;  //assigns scl parameter to Mole variable scale

    display_timer = int(random(2 * frameRate, 5 * frameRate));  //initializes the display_timer
    respawn_timer = int(random(1 * frameRate, 3 * frameRate));  //initializes the respawn_timer

    mallet = new Mallet("mallet.png", 90);  //creates Mallet object and assigns it to mallet

    //randomly initializes alive to true or false
    if (int(random(2)) == 0) {  //if random number is 0
        alive = false;  //Mole is dead
    }
    else {  //if random number is 1
        alive = true;  //Mole is alive
        ++score.total_moles;  //increments Score object's total_moles variable
    }
}

//changes the state of the Mole
void update() {
    if (respawn_timer == 0) {  //if it's time for the Mole to be respawned
        alive = true;  //respawns the Mole
        reset_respawn_timer();  //resets the respawn_timer
        reset_display_timer();  //resets the display_timer
        ++score.total_moles;  //increments the Score object's total_moles variable
    }
    --respawn_timer;  //decrements the respawn_timer
}

//displays the Mole
void show() {
    if (alive && display_timer > 0) {  //if Mole is alive and display_timer hasn't run out
        image(mole_img, pos.x, pos.y, size, size);  //displays mole_image at pos.x, pos.y, scaling it to size, size
        --display_timer;  //decrements the display_timer
    }
    else {  //if Mole is dead or display_timer ran out
        image(hill_img, pos.x, pos.y, size, size);  //displays hill_img at pos.x, pos.y, scaling it to size, size
    }
}

//called when Mole is hit
void hit() {
    if (alive && mouse_over()) {  //if Mole is alive and mouse cursor is over its hitbox
        alive = false;  //Mole is dead
        reset_respawn_timer();  //resets the respawn_timer

        //displays mallet.image at mouseX, mouseY - mallet.h / 4, scaling it to mallet.w * scale, mallet.h * scale
        image(mallet.image, mouseX, mouseY - mallet.h / 4,
            mallet.w * scale, mallet.h * scale);

        score.mole_hit();  //adds points to score for hitting a Mole
        score.reaction_bonus(display_timer);  //adds points to score based on reaction time
        ++score.moles_hit;  //increments Score object's moles_hit variable
    }
}

//resets the respawn_timer
void reset_respawn_timer() {
    //assigns a random number to the respawn_timer
    respawn_timer = int(random(3 * frameRate, 5 * frameRate));
}

//resets the display_timer
void reset_display_timer() {
    //assigns a random number to the display_timer
    display_timer = int(random(2 * frameRate, 4 * frameRate));
}

//removes the Mole
void hide() {
    alive = false;  //Mole is dead
}

//determines whether or not the mouse cursor is over the Mole
boolean mouse_over() {
    //if mouse cursor is over the Mole's hitbox, returns true
    if (mouseX > pos.x && mouseX < pos.x + size &&
        mouseY > pos.y && mouseY < pos.y + size)
        return true;
    //if mouse cursor is not over the Mole's hitbox, returns false
    return false;
}
}