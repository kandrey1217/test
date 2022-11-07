
// declares String field_img
var field_img;

// declares String mole_img
var mole_img;

// declares String mole_img2
var mole_img2;

// declares String hill_img
var hill_img;

// declares String hill_img2
var hill_img2;

// declares int game_time
var game_time;

// declares Score score
var score;

// declares int mole_size
var mole_size;

// declares int num_moles
var num_moles;

// declares Mole[] moles
var moles;

// declares Field field
var field;

// called once at the start of the program
function setup() {
    initializeFields();
    // sets the window size to 1100 by 650
    createCanvas(1100, 650);
    // initializes field_img
    field_img = "field.jpg";
    // initializes mole_img
    mole_img = "mole.png";
    // initializes mole_img2
    mole_img2 = "mole2.png";
    // initializes hill_img
    hill_img = "mole_hill.png";
    // initializes hill_img2
    hill_img2 = "mole_hill2.png";
    // sets game_time to 60 seconds
    game_time = 30;
    // creates a Score object and assigns it to score
    score = new Score();
    // sets mole_size to 180 pixels
    mole_size = 180;
    // sets num_moles to 6
    num_moles = 6;
    // creates an array of Mole objects and assigns it to moles
    moles = new Array(num_moles);
    // initializes the num_moles Mole objects
    moles[0] = new Mole(mole_img, hill_img, 230, 325, mole_size, 1);
    moles[1] = new Mole(mole_img2, hill_img2, 760, 280, mole_size, 0.9);
    moles[2] = new Mole(mole_img, hill_img, 80, 230, mole_size, 0.8);
    moles[3] = new Mole(mole_img2, hill_img2, 440, 250, mole_size, 0.8);
    moles[4] = new Mole(mole_img, hill_img, 630, 210, mole_size, 0.6);
    moles[5] = new Mole(mole_img2, hill_img2, 940, 230, mole_size, 0.6);
    // creates a Field object and assigns it to field
    field = new Field(field_img, moles);
}

// called repeatedly throughout the program
function draw() {
    // changes the state of the field
    field.update();
    // displays the field on screen
    field.show();
    if (millis() >= game_time * 1000) {
        // if the game is over
        // resets the state of the field
        field.clear();
        // displays the field
        field.show();
        // displays game over text on screen
        // sets the font size to 100 pixels
        textSize(100);
        // sets the text alignment to center
        textAlign(CENTER);
        // displays "Game Over" text
        text("Game Over", width / 2, height / 2);
        // ends the program, by preventing further draw() calls
        noLoop();
    }
}

// called when a mouse key has been pressed
function mousePressed() {
    for (var i = 0; i < moles.length; ++i) {
        // for every Mole in the moles array
        // calls the Mole's hit() method
        moles[i].hit();
    }
}


// declares PImage image
var image_field_class;

// declares Mole[] mole_lst
var mole_lst;

// constructor
class Field {
    constructor(field_img, lst) {
    // creates PImage object and assigns it to image
    //image_field_class = loadImage(field_img);
    // assigns lst parameter to Field variable mole_lst
    mole_lst = lst;
    }
}

// changes the state of the Field
function update() {
    for (var i = 0; i < mole_lst.length; ++i) {
        // for every Mole in mole_lst
        // changes the state of each Mole
        mole_lst[i].update();
    }
}

// displays the field
function show() {
    // sets the background color to blue
    background(130, 200, 255);
    // displays image at 0, 0, scaling it to window width, height
    image(image_field_class, 0, 0, width, height);
    for (var i = 0; i < mole_lst.length; ++i) {
        // for every Mole in mole_lst
        // displays each Mole
        mole_lst[i].show();
    }
    // displays the score
    score.show();
}

// removes all Moles from the Field
function clear() {
    for (var i = 0; i < mole_lst.length; ++i) {
        // for every Mole in mole_lst
        // remove each Mole
        mole_lst[i].hide();
    }
}



// declares PImage mole_img
var mole_img;

// declares PImage hill_img
var hill_img;

// declares PVector pos
var pos;

// declares int size
var size;

// declares float scale
var scale;

// declares boolean alive
var alive;

// declares int respawn_timer
var respawn_timer;

// declares int display_timer
var display_timer;

// declares Mallet mallet
var mallet;

// defines nested class Mallet

// declares PImage image
var image_mallet_class;

// declares int w
var w;

// declares int h
var h;

// Mallet's constructor
class Mallet {
    constructor(img, sz) {
    // creates PImage object and assigns it to image
    //image_mallet_class = loadImage(img);
    // assigns sz to Mallet variable w
    w = sz;
    // calculates the Mallet's height and assigns it to h
    h = int(sz * 1.5);
    }
}

// Mole's constructor
class Mole {
    constructor(img, img2, x, y, sz, scl) {
    // creates PImage object and assigns it to mole_img
    //mole_img = loadImage(img);
    // creates PImage object and assigns it to mole_img
    //hill_img = loadImage(img2);
    // creates PVector with x, y parameters and assigns it to pos
    pos = new PVector(x, y);
    // calculates the Mole's size and assigns it to size
    size = int(sz * scl);
    // assigns scl parameter to Mole variable scale
    scale = scl;
    // initializes the display_timer
    display_timer = int(random(2 * frameRate, 5 * frameRate));
    // initializes the respawn_timer
    respawn_timer = int(random(1 * frameRate, 3 * frameRate));
    // creates Mallet object and assigns it to mallet
    mallet = new Mallet("mallet.png", 90);
    // randomly initializes alive to true or false
    if (int(random(2)) === 0) {
        // if random number is 0
        // Mole is dead
        alive = false;
    } else {
        // if random number is 1
        // Mole is alive
        alive = true;
        // increments Score object's total_moles variable
        ++score.total_moles;
    }
    }
}

// changes the state of the Mole
function update() {
    if (respawn_timer === 0) {
        // if it's time for the Mole to be respawned
        // respawns the Mole
        alive = true;
        // resets the respawn_timer
        reset_respawn_timer();
        // resets the display_timer
        reset_display_timer();
        // increments the Score object's total_moles variable
        ++score.total_moles;
    }
    // decrements the respawn_timer
    --respawn_timer;
}

// displays the Mole
function show() {
    if (alive && display_timer > 0) {
        // if Mole is alive and display_timer hasn't run out
        // displays mole_image at pos.x, pos.y, scaling it to size, size
        image(mole_img, pos.x, pos.y, size, size);
        // decrements the display_timer
        --display_timer;
    } else {
        // if Mole is dead or display_timer ran out
        // displays hill_img at pos.x, pos.y, scaling it to size, size
        image(hill_img, pos.x, pos.y, size, size);
    }
}

// called when Mole is hit
function hit() {
    if (alive && mouse_over()) {
        // if Mole is alive and mouse cursor is over its hitbox
        // Mole is dead
        alive = false;
        // resets the respawn_timer
        reset_respawn_timer();
        // displays mallet.image at mouseX, mouseY - mallet.h / 4, scaling it to mallet.w * scale, mallet.h * scale
        image(mallet.image_mallet_class, mouseX, mouseY - mallet.h / 4, mallet.w * scale, mallet.h * scale);
        // adds points to score for hitting a Mole
        score.mole_hit();
        // adds points to score based on reaction time
        score.reaction_bonus(display_timer);
        // increments Score object's moles_hit variable
        ++score.moles_hit;
    }
}

// resets the respawn_timer
function reset_respawn_timer() {
    // assigns a random number to the respawn_timer
    respawn_timer = int(random(3 * frameRate, 5 * frameRate));
}

// resets the display_timer
function reset_display_timer() {
    // assigns a random number to the display_timer
    display_timer = int(random(2 * frameRate, 4 * frameRate));
}

// removes the Mole
function hide() {
    // Mole is dead
    alive = false;
}

// determines whether or not the mouse cursor is over the Mole
function mouse_over() {
    // if mouse cursor is over the Mole's hitbox, returns true
    if (mouseX > pos.x && mouseX < pos.x + size && mouseY > pos.y && mouseY < pos.y + size)
        return true;
    // if mouse cursor is not over the Mole's hitbox, returns false
    return false;
}



// declares and initializes int points to 0
var points;

// declares and initializes int moles_hit to 0
var moles_hit;

// declares and initializes int total_moles to 0
var total_moles;

// declares and initializes int per_hit_pts to 50
var per_hit_pts;

// declares and initializes int play_time_mult to 20
var play_time_mult;

// declares and initializes int react_time_mult to 15
var react_time_mult;

// declares and initializes int accuracy_mult to 10
var accuracy_mult;

// displays the Score
function show() {
    if (millis() >= game_time * 1000) {
        // if the game is over
        // calculate the final score
        result();
    }
    // displays score text on screen
    // sets font size to 40 pixels
    textSize(40);
    // displays "Score: " text
    text("Score: ", width / 2, 60);
    // displays score value on screen
    // sets font size to 50 pixels
    textSize(50);
    // displays number of points
    text(points, width / 2, 120);
}

// adds points each time a Mole is hit
function mole_hit() {
    // increments points by per_hit_pts
    points += per_hit_pts;
}

// adds points based on reaction time
function reaction_bonus(time) {
    // calculates reaction time points and increments points by that value
    points += (time / frameRate) * react_time_mult;
}

// calculates the final score
function result() {
    if (total_moles > 0) {
        // if total_moles denominator is not 0
        // calculates accuracy points and increments points by that value
        points += accuracy_mult * (100 * moles_hit / total_moles);
    }
    // calculates play time points and increments points by that value
    points += play_time_mult * (millis() / 1000);
}


function initializeFields() {
    field_img = null;
    mole_img = null;
    mole_img2 = null;
    hill_img = null;
    hill_img2 = null;
    game_time = 0;
    score = null;
    mole_size = 0;
    num_moles = 0;
    moles = null;
    field = null;
    image_field_class = null;
    mole_lst = null;
    mole_img = null;
    hill_img = null;
    pos = null;
    size = 0;
    scale = 0;
    alive = false;
    respawn_timer = 0;
    display_timer = 0;
    mallet = null;
    image_mallet_class = null;
    w = 0;
    h = 0;
    points = 0;
    moles_hit = 0;
    total_moles = 0;
    per_hit_pts = 50;
    play_time_mult = 20;
    react_time_mult = 15;
    accuracy_mult = 10;
}

function preload() {
// TODO: put method calls that load from files into this method
// I found the following calls that you should move here:
    image_field_class = loadImage(field_img)
    image_mallet_class = loadImage(img)
    mole_img = loadImage(img)
    hill_img = loadImage(img2)
// (note that line numbers are from your Processing code)
}